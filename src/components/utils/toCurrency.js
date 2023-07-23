export default function toCurrency(amount) {
    const currency = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount);
    return currency;
}