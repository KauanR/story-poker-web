import styles from './styles.module.scss'

const Background = () => {
    const squares: number[] = Array.from(Array(10).keys())

    return (
        <div className={styles.background}>
            <ul className={styles.squares}>
                { squares.map(square => <li key={square}></li>) }
            </ul>
        </div>
    )
}

export default Background