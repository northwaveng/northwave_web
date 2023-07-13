import styles from '@/components/hero/Hero.module.css'
import { Android, Apple } from 'iconsax-react';
import Link from 'next/link';

export default function Hero() {

    return (
        <div className={styles.hero}>
            <div className="container">
                <div className="row ">
                    <div className="col-md-6">
                        <div className="m-2">
                            <h1 className="display-1">We <b>HELP</b> communities save together for shared <b>GOALS.</b></h1>
                            <small>
                                NorthWave is an indigenous financial institution that focuses on empowering
                                people to attain financial freedom with a community of friends, family and colleagues.
                            </small>

                            <div className="d-flex flex-row my-4">
                                <Link href="#" className="btn btn-light mx-2 mr-2"><Apple /> Download</Link>
                                <Link href="#" className="btn btn-light mx-2 ml-2"><Android /> Download</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="m-2">
                            <img
                                src="/phone.png"
                                alt="Phone"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
