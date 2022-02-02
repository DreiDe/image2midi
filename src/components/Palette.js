import Field from "./Field";

const Palette = () => {
    const colors = [
        "#000000",
        "#ffffff",
        "#f97316",
        "#fde047",
        "#22c55e",
        "#14b8a6",
        "#2563eb",
        "#7c3aed",
        "#ec4899",
        "#dc2626",
    ]
    return (
        <div class="flex flex-wrap">
            {
                colors.map(hex => <Field hex={hex} />)
            }
        </div>
    )
};

export default Palette;
