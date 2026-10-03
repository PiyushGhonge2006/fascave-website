const LoadingState = ({
    label = "Loading",
}) => {

    return (
        <div className="admin-loading">
            <span
                className="admin-spinner"
                aria-hidden="true"
            />
            <span>{label}</span>
        </div>
    );

};


export default LoadingState;
