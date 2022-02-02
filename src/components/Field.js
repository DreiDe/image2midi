const Field = ({ hex }) => {
    return (
        <div class="w-8 h-8 rounded-md hover:scale-125 border-gray-300 border-2" style={{backgroundColor: hex}}></div>
    );
};

export default Field;

