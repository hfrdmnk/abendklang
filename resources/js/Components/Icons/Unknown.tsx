export default function Unknown(props: { size: number }) {
    const size = props.size || 24;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M220.225 50.404C185.548 54.8579 162.794 62.7029 139.7 78.17C100.856 104.184 88.395 115.033 76.037 133.597C45.4122 179.599 38.9529 255.879 59.7328 326.146C70.009 360.894 90.5714 394.294 114.924 415.793C137.042 435.318 158.064 446.851 183.375 453.345C208.961 459.909 249.865 463.478 274.786 461.321C312.534 458.054 339.145 448.343 374.875 424.798C409.754 401.815 429.521 380.653 445.354 349.348C462.017 316.401 468.007 281.921 463.604 244.286C461.22 223.905 456.092 207.435 445.748 186.934C443.223 181.93 439.207 173.946 436.824 169.192C420.493 136.611 403.486 114.626 378.089 93.2631C354.366 73.3076 318.703 58.5575 276.638 51.3012C264.886 49.2749 232.972 48.7672 220.225 50.404ZM230.689 66.9302C218.009 68.2541 199.651 71.3377 190.881 73.6178C172.616 78.3656 164.052 82.521 142.529 97.0755C120.171 112.194 111.385 119.025 102.676 128.06C84.0494 147.381 74.643 168.192 68.1492 204.445C65.4032 219.774 64.7508 254.536 66.8635 272.918C71.0008 308.917 79.2798 336.612 93.191 360.992C101.856 376.177 108.613 385.129 120.138 396.69C146.283 422.916 170.298 434.93 207.306 440.296C229.757 443.552 240.574 444.217 262.926 443.716C284.935 443.222 289.153 442.743 287.683 440.908C286.706 439.689 275.063 417.466 269.982 407.126C268.016 403.122 262.423 390.02 257.556 378.01C252.689 365.999 246.892 352.575 244.675 348.177L240.645 340.182L237.276 360.461C235.423 371.614 232.674 390.566 231.167 402.576C227.89 428.705 227.133 432.234 224.227 434.964C221.239 437.771 216.472 437.761 213.473 434.944C209.498 431.211 209.443 432.621 215.27 389.383C216.046 383.628 217.909 372.639 219.412 364.964C220.914 357.288 222.001 350.581 221.827 350.06C221.653 349.538 218.49 354.181 214.798 360.376C211.107 366.571 204.759 376.963 200.692 383.469C196.625 389.974 190.041 400.97 186.062 407.902C178.266 421.48 175.967 423.706 170.797 422.671C167.036 421.92 164.871 419.763 164.18 416.081C163.677 413.395 164.547 411.314 171.002 399.786C177.466 388.241 190.425 367.163 204.808 344.799C207.221 341.046 211.957 333.471 215.33 327.966C218.704 322.461 222.107 316.94 222.892 315.696L224.319 313.436L220.68 315.581C218.678 316.761 209.466 321.818 200.208 326.82C190.95 331.821 181.848 336.889 179.982 338.081C178.117 339.274 175.43 340.249 174.012 340.249C171.492 340.249 167.452 337.417 167.452 335.65C167.452 335.161 166.059 334.096 164.355 333.284C161.192 331.776 159.263 328.862 159.263 325.594C159.263 323.201 165.313 316.873 184.718 298.965C193.464 290.895 204.32 280.811 208.843 276.558C213.367 272.304 220.78 265.753 225.316 262C248.267 243.01 262.337 231.804 274.267 223.012C281.501 217.682 291.442 209.894 296.359 205.704C301.276 201.515 306.661 197.505 308.326 196.791C311.035 195.632 311.704 195.668 314.695 197.129C317.438 198.47 318.725 200.15 321.874 206.497C323.984 210.751 327.444 216.483 329.563 219.235C335.066 226.384 339.419 233.824 339.419 236.08C339.419 239.691 336.628 246.069 334.303 247.768C333.031 248.698 325.795 252.723 318.222 256.712C301.295 265.629 290.361 272.102 272.088 284.027C264.331 289.089 253.638 295.953 248.323 299.28L238.662 305.33L240.324 308.571C241.239 310.353 242.806 312.026 243.808 312.288C245.015 312.603 246.826 315.33 249.176 320.365C251.125 324.546 256.438 335.541 260.981 344.799C265.525 354.057 272.384 369.206 276.224 378.464C280.064 387.723 287.503 403.674 292.754 413.912C301.242 430.456 302.251 432.919 301.829 436.064L301.355 439.601L304.567 438.998C315.369 436.972 332.548 429.961 347.59 421.441C389.43 397.743 415.002 372.559 431.313 338.989C440.022 321.066 444.537 304.909 446.853 283.382C448.681 266.393 446.62 240.112 442.181 223.785C440.317 216.928 432.56 197.879 429.213 191.939C424.535 183.636 423.128 180.599 423.128 178.799C423.128 174.245 404.371 144.829 393.796 132.797C384.423 122.134 370.329 108.684 362.166 102.611C333.352 81.1781 291.099 67.74 249.796 66.8747C241.289 66.6964 232.69 66.7218 230.689 66.9302ZM302.047 223.399C298.831 226.189 291.082 232.155 284.827 236.654C266.576 249.782 215.114 292.521 197.023 309.574C193.866 312.55 238.447 285.556 260.26 271.283C282.528 256.713 294.641 249.524 312.985 239.99C316.712 238.053 319.928 236.301 320.132 236.096C320.336 235.892 318.695 233.345 316.485 230.437C314.275 227.529 311.537 223.615 310.401 221.737C309.264 219.861 308.236 218.325 308.114 218.325C307.992 218.325 305.262 220.608 302.047 223.399Z"
                fill="currentColor"
            />
        </svg>
    );
}
