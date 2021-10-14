export default function parseTime(timeLeft) {
    return (
        <div>
            {Math.floor(timeLeft/3600)}h {Math.floor((timeLeft%3600)/60)}m {Math.floor(timeLeft%60)}s
        </div>
    )
}