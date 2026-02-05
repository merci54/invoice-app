'use client';

import Container from '@/components/Container/Container';
import css from './page.module.scss';
import Link from 'next/link';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Invoice } from '@/types/invoice';

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

    invoiceDate: 'string',
    paymentTerms: 1,
    projectDescription: '',
    items: [],
  };

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
          {({ isSubmitting, errors, touched }) => (
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
                  Client`s Name
                  <Field
                    className={css.form__input}
                    name={'clientName'}
                    placeholder={'Alex Grim'}
                  />
                </label>
                <label className={css.form__label} htmlFor="clientEmail">
                  Client`s Email
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
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
}
