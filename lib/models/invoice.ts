import { Schema, model, models } from "mongoose";

const InvoiceItemSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);

const InvoiceSchema = new Schema(
  {
    // ---------- Invoice Owner ----------
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    // ---------- Humanity ID ----------
    invoiceNumber: {
      type: String,
      unique: true,
      index: true,
    },

    // ---------- Bill From ----------
    billFrom: {
      street: String,
      city: String,
      postCode: String,
      country: String,
    },

    // ---------- Bill To ----------
    clientName: String,
    clientEmail: String,
    billTo: {
      street: String,
      city: String,
      postCode: String,
      country: String,
    },

    // ---------- Invoice meta ----------
    invoiceDate: Date,
    paymentTerms: Number, // 7 | 14 | 30
    projectDescription: String,

    // ---------- Items ----------
    items: [InvoiceItemSchema],

    // ---------- Calculated ----------
    totalAmount: Number,

    status: {
      type: String,
      enum: ["Draft", "Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true, versionKey: false }
);

InvoiceSchema.pre("save", async function () {
  if (this.invoiceNumber) return;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];

  const randomNumbers = Math.floor(1000 + Math.random() * 9000);

  this.invoiceNumber = `${randomLetters}${randomNumbers}`;
});


export const Invoice = models.invoice || model("invoice", InvoiceSchema);
