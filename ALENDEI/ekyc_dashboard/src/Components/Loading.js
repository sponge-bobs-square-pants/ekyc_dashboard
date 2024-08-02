import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div className='loading-containers'>
      <div className='loader'>
        <svg height='0' width='0' viewBox='0 0 64 64' className='absolute'>
          <defs className='s-xJBuHA073rTt' xmlns='http://www.w3.org/2000/svg'>
            <linearGradient
              className='s-xJBuHA073rTt'
              gradientUnits='userSpaceOnUse'
              y2='2'
              x2='0'
              y1='62'
              x1='0'
              id='b'
            >
              <stop className='s-xJBuHA073rTt' stopColor='#139B49'></stop>
              <stop
                className='s-xJBuHA073rTt'
                stopColor='#0A6E41'
                offset='1'
              ></stop>
            </linearGradient>
            {/* <linearGradient
              className='s-xJBuHA073rTt'
              gradientUnits='userSpaceOnUse'
              y2='0'
              x2='0'
              y1='64'
              x1='0'
              id='c'
            >
              <stop className='s-xJBuHA073rTt' stopColor='#FFC800'></stop>
              <stop
                className='s-xJBuHA073rTt'
                stopColor='#F0F'
                offset='1'
              ></stop>
              <animateTransform
                repeatCount='indefinite'
                keySplines='.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1'
                keyTimes='0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1'
                dur='8s'
                values='0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32'
                type='rotate'
                attributeName='gradientTransform'
              ></animateTransform>
            </linearGradient>
            <linearGradient
              className='s-xJBuHA073rTt'
              gradientUnits='userSpaceOnUse'
              y2='2'
              x2='0'
              y1='62'
              x1='0'
              id='d'
            >
              <stop className='s-xJBuHA073rTt' stopColor='#00E0ED'></stop>
              <stop
                className='s-xJBuHA073rTt'
                stopColor='#00DA72'
                offset='1'
              ></stop>
            </linearGradient> */}
          </defs>
        </svg>
        {/* A */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='4 -10 14 124'
          height='120'
          width='300'
          className='inline-block'
          style={{
            marginLeft: '-420px',
            position: 'absolute',
            marginTop: '-10px',
          }}
        >
          <path
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='8'
            stroke='url(#b)'
            d='M3.86363 101.995H0.0965881L40.6477 0.545471H45.5227L86.0739 101.995H82.3068L43.3068 4.50836H42.8636L3.86363 101.995ZM16.7159 64.5462H69.4545V67.7165H16.7159V64.5462Z'
            className='dash'
            id='y'
            pathLength='360'
          ></path>
        </svg>
        {/* L */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 104'
          height='100'
          width='300'
          className='inline-block'
          style={{
            marginLeft: '-300px',
            padding: 'opx',
            position: 'absolute',
          }}
        >
          <path
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='8'
            stroke='url(#b)'
            d='M3.61364 0.545471V102H0.0681839V0.545471H3.61364Z'
            className='dash'
            id='y'
            pathLength='360'
          ></path>
        </svg>
        {/* E */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 -10 14 124'
          height='120'
          width='300'
          className='inline-block'
          style={{
            marginLeft: '-260px',
            padding: 'opx',
            position: 'absolute',
            marginTop: '17px',
          }}
        >
          <path
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='8'
            stroke='url(#b)'
            d='M37.9773 76.7727C30.554 76.7727 24.054 75.0976 18.4773 71.7474C12.9375 68.3972 8.63494 63.8505 5.5696 58.1073C2.50426 52.3641 0.971588 45.887 0.971588 38.6761C0.971588 31.4652 2.50426 24.9882 5.5696 19.2449C8.67187 13.5017 12.8821 8.95504 18.2003 5.60483C23.5185 2.25463 29.5199 0.579529 36.2045 0.579529C41.1534 0.579529 45.733 1.48887 49.9432 3.30755C54.1903 5.12624 57.8835 7.64687 61.0227 10.8694C64.1619 14.092 66.5994 17.8091 68.3352 22.0208C70.108 26.2006 70.9943 30.6675 70.9943 35.4216V38.4847H2.74432V35.4216H67.4489C67.4489 29.5189 66.0455 24.1745 63.2386 19.3885C60.4318 14.5706 56.6648 10.7418 51.9375 7.90212C47.2102 5.06242 41.9659 3.64258 36.2045 3.64258C30.3693 3.64258 25.0881 5.14219 20.3608 8.14142C15.6335 11.1406 11.848 15.2247 9.00426 20.3936C6.16051 25.5625 4.66477 31.4014 4.51704 37.9104V38.2932C4.51704 44.7065 5.80966 50.6092 8.39488 56.0015C11.017 61.3618 14.821 65.6532 19.8068 68.8758C24.7926 72.0984 30.8494 73.7097 37.9773 73.7097C43.2216 73.7097 47.6165 72.912 51.1619 71.3167C54.7443 69.7213 57.6065 67.8867 59.7486 65.8128C61.9276 63.7388 63.5341 61.968 64.5682 60.5003L67.4489 62.2233C66.1932 64.0739 64.3097 66.1318 61.7983 68.3972C59.2869 70.6626 56.0739 72.6248 52.1591 74.284C48.2443 75.9431 43.517 76.7727 37.9773 76.7727Z'
            className='dash'
            id='y'
            pathLength='360'
          ></path>
        </svg>
        {/* N */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 -10 14 124'
          height='120'
          width='300'
          className='inline-block'
          style={{
            marginLeft: '-150px',
            padding: 'opx',
            position: 'absolute',
            marginTop: '18px',
          }}
        >
          <path
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='8'
            stroke='url(#b)'
            d='M3.61363 25.7884V75H0.0681763V1.75486H3.61363V13.3902H4.05681C6.05113 9.5753 9.3196 6.52342 13.8622 4.23451C18.4418 1.9456 23.6676 0.801147 29.5398 0.801147C35.2273 0.801147 40.25 1.86612 44.6079 3.99608C48.9659 6.12604 52.3821 9.06666 54.8565 12.8179C57.331 16.5692 58.5682 20.8927 58.5682 25.7884V75H55.0227V25.7884C55.0227 19.3032 52.6591 14.026 47.9318 9.95679C43.2045 5.88761 37.0739 3.85303 29.5398 3.85303C24.517 3.85303 20.0483 4.79084 16.1335 6.66648C12.2557 8.54211 9.19034 11.133 6.93749 14.4392C4.72159 17.7454 3.61363 21.5285 3.61363 25.7884Z'
            className='dash'
            id='y'
            pathLength='360'
          ></path>
        </svg>
        {/* D */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='10 -12 14 134'
          height='120'
          width='300'
          className='inline-block'
          style={{ marginLeft: '-50px', padding: 'opx', position: 'absolute' }}
        >
          <path
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='8'
            stroke='url(#b)'
            d='M33.767 103.773C27.0455 103.773 21.2287 102.052 16.3168 98.6114C11.4048 95.1374 7.61932 90.4227 4.96023 84.4673C2.30113 78.5118 0.971588 71.7789 0.971588 64.2685C0.971588 56.7911 2.3196 50.0747 5.01562 44.1193C7.71165 38.1639 11.5156 33.4492 16.4276 29.9752C21.3395 26.5012 27.1193 24.7642 33.767 24.7642C38.2727 24.7642 42.4276 25.6079 46.2315 27.2952C50.0355 28.9495 53.3409 31.3317 56.1477 34.4417C58.9545 37.5187 61.0966 41.1747 62.5739 45.4096H63.017V0.545471H66.5625V102.185H63.017V83.1273H62.5739C61.0227 87.3292 58.8622 90.9851 56.0923 94.0952C53.3224 97.1722 50.0355 99.5543 46.2315 101.242C42.4645 102.929 38.3097 103.773 33.767 103.773ZM33.767 100.597C39.7869 100.597 44.9759 99.0084 49.3338 95.8322C53.7287 92.6229 57.108 88.2887 59.4716 82.8295C61.8352 77.3373 63.017 71.1503 63.017 64.2685C63.017 57.3866 61.8168 51.2162 59.4162 45.757C57.0526 40.2648 53.6733 35.9306 49.2784 32.7544C44.9205 29.5451 39.75 27.9404 33.767 27.9404C27.7841 27.9404 22.5952 29.5451 18.2003 32.7544C13.8423 35.9306 10.4631 40.2648 8.0625 45.757C5.69886 51.2162 4.51704 57.3866 4.51704 64.2685C4.51704 71.1503 5.69886 77.3373 8.0625 82.8295C10.4261 88.2887 13.7869 92.6229 18.1449 95.8322C22.5398 99.0084 27.7472 100.597 33.767 100.597Z'
            className='dash'
            id='y'
            pathLength='360'
          ></path>
        </svg>
        {/* E */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 -14 14 124'
          height='120'
          width='300'
          className='inline-block'
          style={{
            marginLeft: '50px',
            padding: 'opx',
            position: 'absolute',
            marginTop: '17px',
          }}
        >
          <path
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='8'
            stroke='url(#b)'
            d='M37.9773 76.7727C30.554 76.7727 24.054 75.0976 18.4773 71.7474C12.9375 68.3972 8.63494 63.8505 5.5696 58.1073C2.50426 52.3641 0.971588 45.887 0.971588 38.6761C0.971588 31.4652 2.50426 24.9882 5.5696 19.2449C8.67187 13.5017 12.8821 8.95504 18.2003 5.60483C23.5185 2.25463 29.5199 0.579529 36.2045 0.579529C41.1534 0.579529 45.733 1.48887 49.9432 3.30755C54.1903 5.12624 57.8835 7.64687 61.0227 10.8694C64.1619 14.092 66.5994 17.8091 68.3352 22.0208C70.108 26.2006 70.9943 30.6675 70.9943 35.4216V38.4847H2.74432V35.4216H67.4489C67.4489 29.5189 66.0455 24.1745 63.2386 19.3885C60.4318 14.5706 56.6648 10.7418 51.9375 7.90212C47.2102 5.06242 41.9659 3.64258 36.2045 3.64258C30.3693 3.64258 25.0881 5.14219 20.3608 8.14142C15.6335 11.1406 11.848 15.2247 9.00426 20.3936C6.16051 25.5625 4.66477 31.4014 4.51704 37.9104V38.2932C4.51704 44.7065 5.80966 50.6092 8.39488 56.0015C11.017 61.3618 14.821 65.6532 19.8068 68.8758C24.7926 72.0984 30.8494 73.7097 37.9773 73.7097C43.2216 73.7097 47.6165 72.912 51.1619 71.3167C54.7443 69.7213 57.6065 67.8867 59.7486 65.8128C61.9276 63.7388 63.5341 61.968 64.5682 60.5003L67.4489 62.2233C66.1932 64.0739 64.3097 66.1318 61.7983 68.3972C59.2869 70.6626 56.0739 72.6248 52.1591 74.284C48.2443 75.9431 43.517 76.7727 37.9773 76.7727Z'
            className='dash'
            id='y'
            pathLength='360'
          ></path>
        </svg>
        {/* I */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 -10 14 124'
          height='120'
          width='300'
          className='inline-block'
          style={{
            marginLeft: '170px',
            padding: 'opx',
            position: 'absolute',
            marginTop: '2px',
          }}
        >
          <path
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='8'
            stroke='url(#b)'
            d='M2.51137 96V20.3906H6.05683V96H2.51137ZM4.2841 6.60761C3.32387 6.60761 2.49291 6.29585 1.7912 5.67234C1.0895 5.04882 0.738647 4.31045 0.738647 3.45721C0.738647 2.60398 1.0895 1.86561 1.7912 1.2421C2.49291 0.618583 3.32387 0.306824 4.2841 0.306824C5.24433 0.306824 6.0753 0.618583 6.777 1.2421C7.4787 1.86561 7.82956 2.60398 7.82956 3.45721C7.82956 4.31045 7.4787 5.04882 6.777 5.67234C6.0753 6.29585 5.24433 6.60761 4.2841 6.60761Z'
            className='dash'
            id='y'
            pathLength='360'
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
