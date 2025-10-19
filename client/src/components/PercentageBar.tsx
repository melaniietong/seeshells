import '../styles/styles.scss'

interface PercentageBarProps {
    percentage: number;
}

const PercentageBar: React.FC<PercentageBarProps> = ({ percentage }) => {
    const p = (percentage * 100).toFixed(1);

    const colorRanges = [
        { min: 80, color: 'green' },
        { min: 50, color: 'yellow' },
        { min: 0, color: 'red' },
    ];

    const colorMatch = colorRanges.find((r) => Number(p) >= r.min);
    const color = colorMatch?.color

    return (
        <div className='d-flex flex-col gap-4'>
            <div className='h-20px background-light-grey'>
                <div
                    className={`h-100 background-${color}`}
                    style={{ width: `${p}%` }}
                />
            </div>
            <div className='text-regular-small'>{p}% confidence</div>
        </div>
    )
}

export default PercentageBar