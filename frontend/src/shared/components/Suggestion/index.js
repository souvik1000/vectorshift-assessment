import Styles from "./suggestion.module.scss";

const Suggestion = ({
    open, suggestions, onClick
}) => {
    return (open &&
        <div className={Styles.suggestionList}>
            {suggestions?.map((sugg) => (
                <div
                    key={sugg.id}
                    className={Styles.suggestionItem}
                    onClick={(event) => {
                        event.preventDefault();
                        onClick?.(sugg);
                    }}
                >
                    {sugg.label}
                </div>
            ))}
        </div>
    )
}

export default Suggestion;
