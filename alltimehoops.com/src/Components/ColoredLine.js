const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export default ColoredLine;