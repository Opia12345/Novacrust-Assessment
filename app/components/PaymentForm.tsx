"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cryptoOptions, currencyOptions, paymentMethods } from "../constants";
import AmountInput from "./AmountInput";
import PaymentMethodDropdown from "../components/PaymentDropdown";

interface FormValues {
  youPay: string;
  youPayCrypto: string;
  youReceive: string;
  youReceiveCurrency: string;
  payFrom: string;
  payTo: string;
}

const CryptoForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validationSchema = Yup.object({
    youPay: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .min(0.01, "Minimum amount is 0.01"),
    youPayCrypto: Yup.string().required("Please select a cryptocurrency"),
    youReceive: Yup.number().required("Amount is required").positive(),
    youReceiveCurrency: Yup.string().required("Please select a currency"),
    payFrom: Yup.string().required("Please select payment method"),
    payTo: Yup.string().required("Please select payment destination"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      youPay: "1.00",
      youPayCrypto: "CELO",
      youReceive: "1.00",
      youReceiveCurrency: "ngn",
      payFrom: "",
      payTo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormValues, { resetForm }) => {
      setIsSubmitting(true);

      //Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        resetForm();
      }, 2000);
      console.log("Form values:", values);
    },
  });

  return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-lg">
        <div className="space-y-4 sm:space-y-6">
          {/* You pay */}
          <AmountInput
            label="You pay"
            name="youPay"
            value={formik.values.youPay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            cryptoOptions={cryptoOptions}
            selectedCrypto={formik.values.youPayCrypto}
            onCryptoSelect={(value) =>
              formik.setFieldValue("youPayCrypto", value)
            }
            error={formik.errors.youPay}
            touched={formik.touched.youPay}
            searchPlaceholder="Search crypto..."
            showSymbol={true}
          />

          {/* You receive */}
          <AmountInput
            label="You receive"
            name="youReceive"
            value={formik.values.youReceive}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            cryptoOptions={currencyOptions}
            selectedCrypto={formik.values.youReceiveCurrency}
            onCryptoSelect={(value) =>
              formik.setFieldValue("youReceiveCurrency", value)
            }
            error={formik.errors.youReceive}
            touched={formik.touched.youReceive}
            searchPlaceholder="Search currency..."
            showSymbol={true}
          />

          {/* Pay from */}
          <PaymentMethodDropdown
            label="Pay from"
            options={paymentMethods}
            selectedValue={formik.values.payFrom}
            onSelect={(value: string) => formik.setFieldValue("payFrom", value)}
            error={formik.errors.payFrom}
            touched={formik.touched.payFrom}
          />

          {/* Pay to */}
          <PaymentMethodDropdown
            label="Pay to"
            options={paymentMethods}
            selectedValue={formik.values.payTo}
            onSelect={(value: string) => formik.setFieldValue("payTo", value)}
            error={formik.errors.payTo}
            touched={formik.touched.payTo}
          />

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => formik.handleSubmit()}
            className="btn text-sm sm:text-base"
          >
            {isSubmitting ? "Converting..." : "Convert now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoForm;
