import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { firestore } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Draft = ({ numPeople, numPlayers, usePositions, draftOrder, draftType }) => {
  const [draftBoard, setDraftBoard] = useState(Array(numPeople).fill().map(() => Array(numPlayers).fill(null)));
  const [peopleNames, setPeopleNames] = useState(Array(numPeople).fill(''));
  const [playerList, setPlayerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = async (event) => {
    if (event.key === 'Enter') {
      const playersCollection = collection(firestore, 'nba_players');
      const q = query(playersCollection, where('name', '>=', searchTerm));
      const querySnapshot = await getDocs(q);
      const players = querySnapshot.docs.map(doc => doc.data().name);
      setPlayerList(players);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    setDraftBoard(prevBoard => {
      const newBoard = [...prevBoard];
      const [removed] = newBoard[source.droppableId].splice(source.index, 1);
      newBoard[destination.droppableId].splice(destination.index, 0, removed);
      return newBoard;
    });
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={onSearch} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playerList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {playerList.map((player, index) => (
                <Draggable key={player} draggableId={player} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {player}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {draftBoard.map((row, i) => (
          <Droppable droppableId={String(i)} key={i}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {row.map((player, j) => (
                  <Draggable key={player} draggableId={player} index={j}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {player}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Draft;