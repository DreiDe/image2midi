const Notch = ({text}) => {
    return (
        <div class="bg-blue-800 rounded-b-2xl absolute left-1/2 transform -translate-x-1/2">
            <h1 class="text-4xl text-center text-white py-2 px-4">{text}</h1>
        </div>
    );
};

export default Notch;
