import '../styles/styles.scss';

const Loading = () => (
    <svg
        width={90}
        height={90}
        fill='none'
        viewBox='0 0 500 500'
        xmlns='http://www.w3.org/2000/svg' >
        <defs>
            <linearGradient
                id='loader-stroke'
                x1='0%' y1='0%' x2='100%' y2='0%' >
                <stop offset='5%' stopColor='var(--grey)' stopOpacity='0.9' />
                <stop offset='65%' stopColor='var(--grey)' stopOpacity='0.4' />
                <stop offset='50%' stopColor='var(--white)' stopOpacity='0' />
                <animateTransform
                    attributeName='gradientTransform'
                    type='rotate'
                    from='0 0.5 0.5'
                    to='360 0.5 0.5'
                    dur='4s'
                    repeatCount='indefinite' />
            </linearGradient>
        </defs>

        <path
            d='M232.89 379.5C239.799 385.159 250.39 390.5 250.39 390.5C250.39 390.5 260.982 385.159 267.89 379.5C301.93 393.774 319.72 400.342 332.89 391.5C348.558 381.03 351.523 367.877 348.89 334.5C368.296 321.926 379.487 313.218 400.89 290C423.168 253.899 425.594 234.049 394.89 200C388.496 167.969 378.624 157.121 348.89 151.5C336.263 122.939 322.979 115.398 288.39 118C272.596 108.488 266.205 104 250.39 104C234.575 104 228.185 108.488 212.39 118C177.802 115.398 164.518 122.939 151.89 151.5C122.157 157.121 112.285 167.969 105.89 200C75.1869 234.049 77.6132 253.899 99.8904 290C121.293 313.218 132.485 321.926 151.89 334.5C149.258 367.877 152.223 381.03 167.89 391.5C181.061 400.342 198.85 393.774 232.89 379.5Z'
            stroke='url(#loader-stroke)'
            strokeWidth='25' />
    </svg>
);

export default Loading;
