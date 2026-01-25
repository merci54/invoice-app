import Image from 'next/image';
import css from './NothingPage.module.scss';

export default function NothingPage() {
    return <div className={css.wrapper}>
        <Image className={css.image} src={'/images/nothing.svg'} alt='Image nothing' width={193} height={160} />
        <div className={css.textBlock}>
            <h2 className={css.title}>
                There is nothing here
            </h2>
            <p className={css.text}>Create an invoice by clicking the 
                New button and get started</p>
        </div>
    </div>
}