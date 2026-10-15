import type { ReactNode } from 'react';
import {
    CreditCard,
    FileText,
    Gift,
    HelpCircle,
    Package,
    RefreshCcw,
    Search,
    ShieldAlert,
    Sparkles,
    Truck,
} from 'lucide-react';

export type FaqCategory = 'shipping' | 'returns' | 'payments';

export interface FaqItem {
    question: string;
    answer: string;
    category: FaqCategory;
    icon: ReactNode;
}

const iconClass = 'size-5 text-[#E41F66]';

export const faqs: FaqItem[] = [
    { category: 'shipping', question: 'Is my Order Confirmed?', answer: 'Once you have placed your order, you should receive an email confirmation with your Order Id.', icon: <Package className={iconClass} /> },
    { category: 'shipping', question: 'When will you Ship My Order?', answer: 'We normally ship all orders within 15 business days, but there might be a slight delay in shipment depending upon your order customization or in the case of some unavoidable circumstances. Final delivery time will vary based on your location.', icon: <Truck className={iconClass} /> },
    { category: 'shipping', question: 'When will my order get Delivered?', answer: 'It usually takes 15-20 business days for your order to get delivered. But the delivery time may vary depending on your order customization and location.', icon: <Truck className={iconClass} /> },
    { category: 'shipping', question: 'How much do you Charge for Delivery?', answer: 'Delivery charges depend on the weight of your parcel and will be calculated at the checkout page.', icon: <CreditCard className={iconClass} /> },
    { category: 'shipping', question: 'How can I Track my Order?', answer: "An Email containing your Tracking Id and details of the service provider is sent to you after the order is shipped. If you can't find the tracking information in your email, or if you have any other questions related to tracking, reach out to us on vivahstore.india@gmail.com or contact us on +91 8507756877. They will be glad to assist you and provide the necessary information.", icon: <Search className={iconClass} /> },
    { category: 'shipping', question: 'What if I have not received some part of my order?', answer: "If some part of your order is missing, it's possible that it could have been sent in more than one parcel, due to the large size of your order. In this case, you will receive one dispatch email per parcel. If you have only received one dispatch email and haven't received all of your items, please contact us within 7 days.", icon: <HelpCircle className={iconClass} /> },
    { category: 'shipping', question: 'Can I Update My Order?', answer: 'Kindly note that we work hard to get your order dispatched as quickly as possible, we may not be able to update your order in time. If your order has not been shipped, please reach out to us at vivahstore.india@gmail.com or contact us on +91 8507756877 with your details. Kindly note that we cannot guarantee that the change will be made as the order may have been already processed.', icon: <Package className={iconClass} /> },
    { category: 'shipping', question: 'Can I have my order Gift-Wrapped?', answer: 'Gift wrap option is available for all products. An additional amount of ₹75 will be charged.', icon: <Gift className={iconClass} /> },
    { category: 'shipping', question: 'I have received a Damaged Product, what should I do?', answer: 'In case you receive a damaged product, please capture an unboxing video for evidence and reach out to us on vivahstore.india@gmail.com and we will resolve the issue ASAP.', icon: <ShieldAlert className={iconClass} /> },
    { category: 'returns', question: 'What is your Return Policy?', answer: 'You can return certain products upto 5 days from the date of delivery. You can send a request to vivahstore.india@gmail.com or call our number +91 8507756877. The returned product should be in its original packaging and in the same unused condition as received.', icon: <RefreshCcw className={iconClass} /> },
    { category: 'returns', question: 'What items can I Return?', answer: 'You can only return items that are damaged/defective. You will need to inform us of any damages/defects within 24 hours of delivery of the product, in order to receive the replacement.', icon: <ShieldAlert className={iconClass} /> },
    { category: 'returns', question: 'Do you arrange for Reverse Pickups?', answer: 'Reverse pickup is not available on any items, you will have to ship the item back to our address.', icon: <Truck className={iconClass} /> },
    { category: 'returns', question: 'Where do I Ship the Returns?', answer: 'Please mail the item(s) to the address below. Do remember to mention your Order ID and Contact Number. Adarsh Sharma. Auto Stand, in front of ICICI Bank, near Kagal Nagar, Sonari East, Kagal Nagar, Sonari, Jamshedpur, Jharkhand - 831011, Contact Number: +91 8507756877.', icon: <Package className={iconClass} /> },
    { category: 'returns', question: 'What if the parcel gets returned back by the shipping company?', answer: "In any circumstance if your parcel gets returned back to us by the company, lets say because the customer's phone was not reachable, you'll have to pay the shipping amount again for us to reship it to you.", icon: <ShieldAlert className={iconClass} /> },
    { category: 'returns', question: 'When will I receive my Replacement?', answer: 'Replacement will be shipped after the original item has been received, subject to the following conditions: 1.The item(s) should be unused, unsoiled and unwashed. 2.The package should have the original packaging. They should be returned within 7 days from the dispatch date. Any returned item received by us that does not meet the above mentioned conditions will not be accepted. No amount will be reimbursed in this case.', icon: <RefreshCcw className={iconClass} /> },
    { category: 'returns', question: 'Can I choose a Different Item in Exchange?', answer: 'You can only exchange your item if it is damaged/defective within 5 days and receive a replacement of that exact product or another product of the same value. If the value of the replacement product exceeds that of the previously purchased product, the difference will have to be paid in advance.', icon: <RefreshCcw className={iconClass} /> },
    { category: 'returns', question: 'What is your Refund Policy?', answer: 'We do not refund money even if the item(s) is damaged/defective. We only exchange the product.', icon: <ShieldAlert className={iconClass} /> },
    { category: 'returns', question: 'Do you have Discounts / Sales?', answer: 'Yes we do. Subscribe to our newsletter for all the perks!', icon: <Sparkles className={iconClass} /> },
    { category: 'payments', question: 'What Payment Methods do you accept?', answer: 'We accept UPI payments (Google Pay, PhonePe, Paytm), net banking, as well as all major credit and debit cards at checkout.', icon: <CreditCard className={iconClass} /> },
    { category: 'payments', question: 'Is my payment information secure?', answer: 'Yes, all transactions are processed through highly secure, industry-standard encrypted payment gateways. We do not store any card details on our servers.', icon: <CreditCard className={iconClass} /> },
    { category: 'payments', question: 'Can I request a GST Invoice?', answer: 'An invoice is automatically emailed to you upon order confirmation. If you need a GST invoice or custom company billing info, please reach out to us at vivahstore.india@gmail.com with your GST details.', icon: <FileText className={iconClass} /> },
];