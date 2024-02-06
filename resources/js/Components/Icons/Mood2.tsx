export default function Mood2(props: { size: number }) {
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
                d="M352.528 92.5315C350.809 93.3627 348.743 95.7413 347.939 97.8169C347.135 99.8926 346.281 117.509 346.043 136.964C345.642 169.537 345.815 172.566 348.226 175.233C354.106 181.74 363.765 180.319 368.66 172.227C371.202 168.026 371.443 164.79 371.412 135.324C371.373 100.407 370.515 95.3666 364.104 92.4469C359.816 90.4932 356.698 90.5147 352.528 92.5315ZM147.7 96.3714C140.152 104.251 136.823 125.988 139.496 149.957C142.495 176.842 144.891 182.877 153.42 185.017C158.597 186.316 163.837 184.229 167.396 179.451C170.3 175.549 170.307 175.302 167.885 163.65C164.43 147.025 163.331 126.262 165.396 116.663C168.903 100.372 168.892 99.8711 164.951 95.9307C159.805 90.7846 152.883 90.9612 147.7 96.3714ZM209.238 345.033C162.682 348.145 126.815 357.136 92.5607 374.281C72.0852 384.53 62.2595 391.275 55.1482 399.964C51.1791 404.815 50.4829 406.668 51.1317 410.664C52.1638 417.028 54.2151 419.284 59.9426 420.358C65.5051 421.402 69.2473 419.692 77.1754 412.484C83.8159 406.448 104.254 395.631 118.804 390.449C147.793 380.126 172.231 375.578 213.545 372.817C287.99 367.841 337.579 371.546 376.723 385.01C391.474 390.082 416.796 401.206 422.072 404.931C429.093 409.888 443.768 416.676 447.463 416.676C452.908 416.676 460.206 409.47 460.206 404.094C460.206 397.049 456.667 393.386 441.585 384.822C404.888 363.983 371.043 352.295 329.818 346.227C314.388 343.957 303.823 343.514 268.81 343.681C245.52 343.791 218.713 344.4 209.238 345.033Z"
                fill="currentColor"
            />
        </svg>
    );
}
