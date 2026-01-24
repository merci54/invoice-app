import css from './InvoicesList.module.scss';
import InvoiceCard from '../InvoiceCard/InvoiceCard';
import { InvoiceProps } from '@/types/invoice';

export default function InvoicesList() {

    const testProps: InvoiceProps = {
        id: 'RT3080',
        name: 'Jensen Huang',
        date: 'Due  19 Aug 2021',
        sum: '1800.90',
        status: 'Paid'
    }

    const testProps2: InvoiceProps = {
         id: 'XM9141',
        name: 'Alex Grim',
        date: 'Due  20 Sep 2021',
        sum: '556.00',
        status: 'Pending'
    }
    const testProps3: InvoiceProps = {
         id: 'FV2353',
        name: 'Anita Wainwright',
        date: 'Due  12 Nov 2021',
        sum: '3,102.04',
        status: 'Draft'
    }
    return <ul className={css.list}>
            
            <InvoiceCard {...testProps} />
            <InvoiceCard {...testProps2} />
            <InvoiceCard {...testProps3} />
          </ul>
}