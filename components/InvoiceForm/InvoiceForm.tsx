'use client';

import css from './InvoiceForm.module.scss';
import { Field, FieldArray, Form, Formik } from 'formik';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import Select, { CSSObjectWithLabel, ControlProps, OptionProps, StylesConfig } from 'react-select';
import * as Yup from 'yup';
import { initialInvoice } from '@/types/invoice';

type PaymentOption = {
  value: number;
  label: string;
};

interface InvoiceFormProps {
  initialValues: initialInvoice;
  onSubmit: (values: initialInvoice) => Promise<void>;
  isCreateInvoice?: boolean;
}

const formSchema = Yup.object({
  billFrom: Yup.object({
    street: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Street is required'),
    city: Yup.string().required('City is required'),
    postCode: Yup.string().min(2).max(8).required('Post Code is required'),
    country: Yup.string().required('Country is required'),
  }),

  clientName: Yup.string().required("Client's name is required"),

  clientEmail: Yup.string().email('Invalid email').required("Client's email is required"),

  billTo: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    postCode: Yup.string().min(2).max(8).required('Post Code is required'),
    country: Yup.string().required('Country is required'),
  }),

  invoiceDate: Yup.string().required('Invoice date is required'),
  paymentTerms: Yup.number().oneOf([1, 7, 14, 30]).required('Payment terms is required'),
  projectDescription: Yup.string().required('Project description is required'),

  items: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Item name is required'),

        quantity: Yup.number().min(1, 'Minimum quantity is 1').required('Quantity is required'),

        price: Yup.number().min(0.01, 'Price must be greater than 0').required('Price is required'),

        total: Yup.number(),
      })
    )
    .min(1, 'At least one item is required'),
});

export function InvoiceForm({ initialValues, onSubmit, isCreateInvoice }: InvoiceFormProps) {
  // State for calendar visibility
  const [showCalendar, setShowCalendar] = useState(false);

  // Ref for calendar to handle outside clicks
  const calendarRef = useRef<HTMLDivElement>(null);

  // Payment options for the select dropdown
  const paymentOptions = [
    { value: 1, label: 'Net 1 Day' },
    { value: 7, label: 'Net 7 Days' },
    { value: 14, label: 'Net 14 Days' },
    { value: 30, label: 'Net 30 Days' },
  ];

  function normalizeDateToUTC(date: Date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
  }

  // Effect to handle clicks outside the calendar to close it
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

  // Custom styles for react-select
  const customSelectStyles: StylesConfig<PaymentOption, false> = {
    control: (base: CSSObjectWithLabel, state: ControlProps<PaymentOption, false>) => ({
      ...base,
      borderRadius: '4px',
      border: state.isFocused ? '1px solid var(--color-02)' : '1px solid var(--input-border)',
      padding: '14px 20px 14px 20px',
      backgroundColor: 'var(--input-bg)',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': {
        border: state.isFocused ? '1px solid var(--color-02)' : '1px solid var(--input-border)',
      },
    }),
    valueContainer: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: 0,
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      fontSize: '15px',
      fontWeight: 700,
      color: 'var(--text)',
      margin: 0,
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      fontSize: '15px',
      fontWeight: 700,
      color: 'var(--text)',
      margin: 0,
    }),
    input: (base: CSSObjectWithLabel) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base: CSSObjectWithLabel) => ({
      ...base,
      color: 'var(--color-01)',
      padding: 0,
      '&:hover': {
        color: 'var(--color-01)',
      },
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0px 10px 20px 0px rgba(72, 84, 159, 0.25)',
      marginTop: '24px',
      overflow: 'hidden',
      border: 'none',
    }),
    menuList: (base: CSSObjectWithLabel) => ({
      ...base,
      padding: 0,
    }),
    option: (base: CSSObjectWithLabel, state: OptionProps<PaymentOption, false>) => ({
      ...base,
      fontSize: '15px',
      fontWeight: 700,
      color: state.isSelected ? 'var(--color-01)' : 'var(--custom-text)',
      backgroundColor: 'var(--input-bg)',
      padding: '17px 24px 16px 24px',
      cursor: 'pointer',
      borderBottom: '1px solid var(--input-border)',
      '&:hover': {
        color: 'var(--color-01)',
        backgroundColor: '#fff',
      },
      '&:last-child': {
        borderBottom: 'none',
      },
    }),
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={formSchema}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form id="invoiceForm" className={css.form}>
          {/* Bill From */}
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
                <Field className={css.form__input} name={'billFrom.city'} placeholder={'London'} />
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

          {/* Bill To */}
          <fieldset className={css.form__group}>
            <legend className={css.form__legend}>Bill To</legend>
            <label className={css.form__label} htmlFor="clientName">
              Client&apos;s Name
              <Field className={css.form__input} name={'clientName'} placeholder={'Alex Grim'} />
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
                <Field className={css.form__input} name={'billTo.city'} placeholder={'London'} />
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

          {/* Calendar and Picker */}
          <fieldset className={css.form__group}>
            <div className={css.calendar} ref={calendarRef}>
              <label className={css.form__label} htmlFor="invoiceDate">
                Invoice Date
              </label>
              {isCreateInvoice ? (
                <div
                  className={`${css.calendar__input} ${showCalendar ? css.calendar__active : ''}`}
                  onClick={() => setShowCalendar(!showCalendar)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>
                    {values.invoiceDate
                      ? format(new Date(values.invoiceDate), 'dd MMM yyyy')
                      : '21 Aug 2021'}
                  </span>
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
              ) : (
                <div
                  className={`${css.calendar__input} ${showCalendar ? css.calendar__active : ''}`}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#85868a',
                  }}
                >
                  <span>
                    {values.invoiceDate
                      ? format(new Date(values.invoiceDate), 'dd MMM yyyy')
                      : '21 Aug 2021'}
                  </span>
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
                      fill="#bec3e2"
                    />
                  </svg>
                </div>
              )}

              {showCalendar && (
                <div className={css.calendarWrapper}>
                  <DayPicker
                    mode="single"
                    hideWeekdays
                    navLayout="around"
                    showOutsideDays
                    selected={values.invoiceDate ? new Date(values.invoiceDate) : undefined}
                    onSelect={date => {
                      if (!date) return;

                      const isoDate = normalizeDateToUTC(date);

                      setFieldValue('invoiceDate', isoDate);
                      setShowCalendar(false);
                    }}
                    formatters={{
                      formatCaption: date => format(date, 'MMM yyyy'),
                    }}
                  />
                </div>
              )}
            </div>

            {/* Payment Terms picker */}
            <div className={css.select}>
              <label className={css.form__label} htmlFor="paymentTerms">
                Payment Terms
              </label>
              <Select
                instanceId="paymentTerms"
                options={paymentOptions}
                value={paymentOptions.find(option => option.value === values.paymentTerms)}
                onChange={option => setFieldValue('paymentTerms', option?.value)}
                styles={customSelectStyles}
                isSearchable={false}
                placeholder="Net 30 Days"
              />
            </div>

            <label className={css.form__label} htmlFor="projectDescription">
              Project Description
              <Field
                className={css.form__input}
                name={'projectDescription'}
                placeholder={'Graphic Design'}
              />
            </label>
          </fieldset>

          {/* Items List */}
          <fieldset className={css.items}>
            <legend className={css.items__legend}>Item List</legend>
            <FieldArray name="items">
              {({ push, remove }) => (
                <>
                  <ul className={css.items__list}>
                    {values.items.map((item, index) => {
                      const total = item.quantity * item.price;

                      return (
                        <li key={index} className={css.items__item}>
                          {/* Item Name */}
                          <label className={css.items__label}>
                            Item Name
                            <Field
                              className={css.form__input}
                              name={`items[${index}].name`}
                              placeholder="Banner Design"
                            />
                          </label>

                          <div className={css.items__group}>
                            <div>
                              {/* Qty */}

                              <label className={`${css.form__label} ${css.items__qtyLabel}`}>
                                Qty.
                                <Field
                                  className={css.form__input}
                                  type="number"
                                  name={`items[${index}].quantity`}
                                />
                              </label>

                              {/* Price */}
                              <label className={`${css.form__label} ${css.items__priceLabel}`}>
                                Price
                                <Field
                                  className={css.form__input}
                                  type="number"
                                  name={`items[${index}].price`}
                                />
                              </label>

                              {/* Total */}
                              <div className={css.items__total}>
                                Total
                                <span>{total.toFixed(2)}</span>
                              </div>
                            </div>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className={css.items__delete}
                            >
                              <svg
                                width="13"
                                height="16"
                                viewBox="0 0 13 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.5557 3.55566V14.2227C11.5554 15.2047 10.7594 16 9.77734 16H2.66699C1.68489 16 0.888913 15.2047 0.888672 14.2227V3.55566H11.5557ZM8.44434 0L9.33301 0.888672H12.4443V2.66699H0V0.888672H3.11133L4 0H8.44434Z"
                                  fill="#888EB0"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Add New Item */}
                  <button
                    type="button"
                    className={css.items__add}
                    onClick={() =>
                      push({
                        name: '',
                        quantity: 1,
                        price: 0,
                        total: 0,
                      })
                    }
                  >
                    + Add New Item
                  </button>
                </>
              )}
            </FieldArray>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
}
