// 'use client';

// import Container from '@/components/Container/Container';
// import css from './page.module.scss';
// import Link from 'next/link';
// import { Field, Form, Formik, FormikHelpers } from 'formik';
// import { Invoice } from '@/types/invoice';
// import 'react-day-picker/style.css';

// export default function CreateInvoice() {
//   type initialInvoice = Omit<Invoice, '_id' | 'status' | 'totalAmount' | 'invoiceNumber'>;
//   const initialValues: initialInvoice = {
//     billFrom: {
//       street: '',
//       city: '',
//       postCode: '',
//       country: '',
//     },

//     clientName: '',
//     clientEmail: '',

//     billTo: {
//       street: '',
//       city: '',
//       postCode: '',
//       country: '',
//     },

//     invoiceDate: '',
//     paymentTerms: 1,
//     projectDescription: '',
//     items: [],
//   };

//   const handleSubmit = (
//     values: initialInvoice,
//     { setSubmitting }: FormikHelpers<initialInvoice>
//   ) => {
//     console.log(values);
//   };
//   return (
//     <main className={css.main}>
//       <Container>
//         <div className={css.back}>
//           <Link href={'/invoices'}>
//             <svg
//               className={css.back__icon}
//               width="5"
//               height="10"
//               viewBox="0 0 5 10"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M4.22778 0.707031L-0.000118256 4.93493L4.22778 9.16283"
//                 stroke="#7C5DFA"
//                 strokeWidth="2"
//               />
//             </svg>
//           </Link>
//           <Link href={'/invoices'}>
//             <span className={css.back__link}>Go back</span>
//           </Link>
//         </div>
//         <h1 className={css.title}>New Invoice</h1>
//         <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//           {({ isSubmitting }) => (
//             <Form className={css.form}>
//               <fieldset className={css.form__group}>
//                 <legend className={css.form__legend}>Bill From</legend>

//                 <label className={css.form__label} htmlFor="billFrom.street">
//                   Street Address
//                   <Field
//                     className={css.form__input}
//                     name={'billFrom.street'}
//                     placeholder={'19 Union Terrace'}
//                   />
//                 </label>

//                 <div className={css.form__double}>
//                   <label className={css.form__label} htmlFor="billFrom.city">
//                     City
//                     <Field
//                       className={css.form__input}
//                       name={'billFrom.city'}
//                       placeholder={'London'}
//                     />
//                   </label>

//                   <label className={css.form__label} htmlFor="billFrom.postCode">
//                     Post Code
//                     <Field
//                       className={css.form__input}
//                       name={'billFrom.postCode'}
//                       placeholder={'E1 3EZ'}
//                     />
//                   </label>
//                 </div>
//                 <label className={css.form__label} htmlFor="billFrom.country">
//                   Country
//                   <Field
//                     className={css.form__input}
//                     name={'billFrom.country'}
//                     placeholder={'United Kingdom'}
//                   />
//                 </label>
//               </fieldset>
//               <fieldset className={css.form__group}>
//                 <legend className={css.form__legend}>Bill To</legend>
//                 <label className={css.form__label} htmlFor="clientName">
//                   Client`s Name
//                   <Field
//                     className={css.form__input}
//                     name={'clientName'}
//                     placeholder={'Alex Grim'}
//                   />
//                 </label>
//                 <label className={css.form__label} htmlFor="clientEmail">
//                   Client`s Email
//                   <Field
//                     className={css.form__input}
//                     name={'clientEmail'}
//                     placeholder={'alexgrim@mail.com'}
//                     type="email"
//                   />
//                 </label>

//                 <label className={css.form__label} htmlFor="billTo.street">
//                   Street Address
//                   <Field
//                     className={css.form__input}
//                     name={'billTo.street'}
//                     placeholder={'84 Church Way'}
//                   />
//                 </label>

//                 <div className={css.form__double}>
//                   <label className={css.form__label} htmlFor="billTo.city">
//                     City
//                     <Field
//                       className={css.form__input}
//                       name={'billTo.city'}
//                       placeholder={'London'}
//                     />
//                   </label>

//                   <label className={css.form__label} htmlFor="billTo.postCode">
//                     Post Code
//                     <Field
//                       className={css.form__input}
//                       name={'billTo.postCode'}
//                       placeholder={'E1 3EZ'}
//                     />
//                   </label>
//                 </div>
//                 <label className={css.form__label} htmlFor="billTo.country">
//                   Country
//                   <Field
//                     className={css.form__input}
//                     name={'billTo.country'}
//                     placeholder={'United Kingdom'}
//                   />
//                 </label>
//               </fieldset>
//               <fieldset className={css.form__group}>
//                 <label className={`${css.form__label} ${css.inputIcon}`} htmlFor="invoiceDate">
//                   Invoice Date
//                   <Field
//                     className={css.form__input}
//                     name={'invoiceDate'}
//                     placeholder={'21 Aug 2021'}
//                   />
//                   <svg
//                     className={css.icon}
//                     width="16"
//                     height="16"
//                     viewBox="0 0 16 16"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       clip-rule="evenodd"
//                       d="M13.3334 2H14C15.1027 2 16 2.89734 16 4V14C16 15.1027 15.1027 16 14 16H2C0.897339 16 0 15.1027 0 14V4C0 2.89734 0.897339 2 2 2H2.66663V0.666626C2.66663 0.298706 2.96533 0 3.33337 0H4C4.36804 0 4.66663 0.298706 4.66663 0.666626V2H11.3334V0.666626C11.3334 0.298706 11.632 0 12 0H12.6666C13.0347 0 13.3334 0.298706 13.3334 0.666626V2ZM14 14.6666C14.3673 14.6666 14.6666 14.3673 14.6666 14V6.69336H1.33337V14C1.33337 14.3673 1.63269 14.6666 2 14.6666H14Z"
//                       fill="#7E88C3"
//                     />
//                   </svg>
//                 </label>

//                 <label className={css.form__label} htmlFor="paymentTerms">
//                   Payment Terms
//                   <Field
//                     className={css.form__input}
//                     name={'paymentTerms'}
//                     placeholder={'Net 1 Day'}
//                   />
//                 </label>
//                 <label className={css.form__label} htmlFor="projectDescription">
//                   Project Description
//                   <Field
//                     className={css.form__input}
//                     name={'projectDescription'}
//                     placeholder={'Graphic Design'}
//                   />
//                 </label>
//               </fieldset>
//             </Form>
//           )}
//         </Formik>
//       </Container>
//     </main>
//   );
// }

'use client';

import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Link from 'next/link';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Invoice } from '@/types/invoice';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';

export default function CreateInvoice() {
  type initialInvoice = Omit<Invoice, '_id' | 'status' | 'totalAmount' | 'invoiceNumber'>;
  const initialValues: initialInvoice = {
    billFrom: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },

    clientName: '',
    clientEmail: '',

    billTo: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },

    invoiceDate: '',
    paymentTerms: 1,
    projectDescription: '',
    items: [],
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Закрытие календаря при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const handleSubmit = (
    values: initialInvoice,
    { setSubmitting }: FormikHelpers<initialInvoice>
  ) => {
    console.log(values);
  };

  return (
    <main className={css.main}>
      <Container>
        <div className={css.back}>
          <Link href={'/invoices'}>
            <svg
              className={css.back__icon}
              width="5"
              height="10"
              viewBox="0 0 5 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.22778 0.707031L-0.000118256 4.93493L4.22778 9.16283"
                stroke="#7C5DFA"
                strokeWidth="2"
              />
            </svg>
          </Link>
          <Link href={'/invoices'}>
            <span className={css.back__link}>Go back</span>
          </Link>
        </div>
        <h1 className={css.title}>New Invoice</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className={css.form}>
              <fieldset className={css.form__group}>
                <legend className={css.form__legend}>Bill From</legend>

                <label className={css.form__label} htmlFor="billFrom.street">
                  Street Address
                  <Field
                    className={css.form__input}
                    name={'billFrom.street'}
                    placeholder={'19 Union Terrace'}
                  />
                </label>

                <div className={css.form__double}>
                  <label className={css.form__label} htmlFor="billFrom.city">
                    City
                    <Field
                      className={css.form__input}
                      name={'billFrom.city'}
                      placeholder={'London'}
                    />
                  </label>

                  <label className={css.form__label} htmlFor="billFrom.postCode">
                    Post Code
                    <Field
                      className={css.form__input}
                      name={'billFrom.postCode'}
                      placeholder={'E1 3EZ'}
                    />
                  </label>
                </div>
                <label className={css.form__label} htmlFor="billFrom.country">
                  Country
                  <Field
                    className={css.form__input}
                    name={'billFrom.country'}
                    placeholder={'United Kingdom'}
                  />
                </label>
              </fieldset>
              <fieldset className={css.form__group}>
                <legend className={css.form__legend}>Bill To</legend>
                <label className={css.form__label} htmlFor="clientName">
                  Client&apos;s Name
                  <Field
                    className={css.form__input}
                    name={'clientName'}
                    placeholder={'Alex Grim'}
                  />
                </label>
                <label className={css.form__label} htmlFor="clientEmail">
                  Client&apos;s Email
                  <Field
                    className={css.form__input}
                    name={'clientEmail'}
                    placeholder={'alexgrim@mail.com'}
                    type="email"
                  />
                </label>

                <label className={css.form__label} htmlFor="billTo.street">
                  Street Address
                  <Field
                    className={css.form__input}
                    name={'billTo.street'}
                    placeholder={'84 Church Way'}
                  />
                </label>

                <div className={css.form__double}>
                  <label className={css.form__label} htmlFor="billTo.city">
                    City
                    <Field
                      className={css.form__input}
                      name={'billTo.city'}
                      placeholder={'London'}
                    />
                  </label>

                  <label className={css.form__label} htmlFor="billTo.postCode">
                    Post Code
                    <Field
                      className={css.form__input}
                      name={'billTo.postCode'}
                      placeholder={'E1 3EZ'}
                    />
                  </label>
                </div>
                <label className={css.form__label} htmlFor="billTo.country">
                  Country
                  <Field
                    className={css.form__input}
                    name={'billTo.country'}
                    placeholder={'United Kingdom'}
                  />
                </label>
              </fieldset>
              <fieldset className={css.form__group}>
                <div className={css.inputIcon} ref={calendarRef}>
                  <label className={css.form__label} htmlFor="invoiceDate">
                    Invoice Date
                  </label>
                  <div
                    className={css.form__input}
                    onClick={() => setShowCalendar(!showCalendar)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{values.invoiceDate || '21 Aug 2021'}</span>
                    <svg
                      className={css.icon}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.3334 2H14C15.1027 2 16 2.89734 16 4V14C16 15.1027 15.1027 16 14 16H2C0.897339 16 0 15.1027 0 14V4C0 2.89734 0.897339 2 2 2H2.66663V0.666626C2.66663 0.298706 2.96533 0 3.33337 0H4C4.36804 0 4.66663 0.298706 4.66663 0.666626V2H11.3334V0.666626C11.3334 0.298706 11.632 0 12 0H12.6666C13.0347 0 13.3334 0.298706 13.3334 0.666626V2ZM14 14.6666C14.3673 14.6666 14.6666 14.3673 14.6666 14V6.69336H1.33337V14C1.33337 14.3673 1.63269 14.6666 2 14.6666H14Z"
                        fill="#7E88C3"
                      />
                    </svg>
                  </div>
                  {showCalendar && (
                    <div className={css.calendarWrapper}>
                      <DayPicker
                        mode="single"
                        selected={values.invoiceDate ? new Date(values.invoiceDate) : undefined}
                        onSelect={date => {
                          if (date) {
                            setFieldValue('invoiceDate', format(date, 'dd MMM yyyy'));
                            setShowCalendar(false);
                          }
                        }}
                        formatters={{
                          formatCaption: date => format(date, 'MMM yyyy'),
                        }}
                        showOutsideDays={true}
                        fixedWeeks={true}
                      />
                    </div>
                  )}
                </div>

                <label className={css.form__label} htmlFor="paymentTerms">
                  Payment Terms
                  <Field
                    className={css.form__input}
                    name={'paymentTerms'}
                    placeholder={'Net 1 Day'}
                  />
                </label>
                <label className={css.form__label} htmlFor="projectDescription">
                  Project Description
                  <Field
                    className={css.form__input}
                    name={'projectDescription'}
                    placeholder={'Graphic Design'}
                  />
                </label>
              </fieldset>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
}
