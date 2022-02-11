export default function timeLeft(exp) {
    const currentTime = new Date()
    const expTime = new Date(exp)
    return (expTime-currentTime)/1000
}