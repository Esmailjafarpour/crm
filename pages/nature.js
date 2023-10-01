import React from 'react';
import Image from 'next/image';

const Nature = () => {
     return (
          <div>
               {/* <img src="/images/1.jpg"/>
               <img src="/images/2.jpg"/>
               <img src="/images/3.jpg"/>
               <img src="/images/4.jpg"/>
               <img src="/images/5.jpg"/> */}

               <Image src="/images/1.jpg" width={800} height={600} alt="Nature Photo"/>
               <Image src="/images/2.jpg" width={1000} height={700} alt="Nature Photo"/>
               <Image src="/images/3.jpg" width={1000} height={700} alt="Nature Photo"/>
               <Image src="/images/4.jpg" width={1000} height={700} alt="Nature Photo"/>
               <Image src="/images/5.jpg" width={1000} height={700} alt="Nature Photo"/>
          </div>
     );
}

export default Nature;
