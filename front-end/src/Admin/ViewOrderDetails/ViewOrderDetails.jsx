import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import i18n from 'i18next';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from 'qrcode.react';  // Correct import
import './ViewOrderDetails.css';

const ViewOrderDetails = () => {
  const { t } = useTranslation();
  const listorders = useSelector((state) => state.admin.orders);
  const [isOpen, setIsOpen] = useState(false);
  const { Code } = useParams();
  const order = listorders.find((item) => item.id == Code);

  const invoiceRef = useRef();

  if (!order) return <div>{t('order_not_found')}</div>;

  const exportInvoice = () => {
    const invoiceElement = invoiceRef.current;

    html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 60; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      // Save the PDF
      pdf.save(`Invoice_${order.id}.pdf`);
    });
  };

  return (
    <div className="content" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <Sidebar isOpen={isOpen} onSidebarStateChange={setIsOpen} />
      <div className={`main-content ${isOpen ? 'shifted' : 'inshiftd'}`}>
        <Navbar pagePath={t('order_information')} />
        <div className="actions">
            <button onClick={exportInvoice}>
              {t('export_invoice')}
            </button>
          </div>
        <div className="container2">

          <div className="order-details">
            <p><strong>{t('order_id')}:</strong> {order.id}</p>
            <p><strong>{t('name')}:</strong> {order.name}</p>
            <p><strong>{t('phone_number')}:</strong> {order.phonenumber}</p>
            <p><strong>{t('order_date')}:</strong> {order.date}</p>
            <p><strong>{t('house_number')}:</strong> {order.housenumber}</p>

            <h2>{t('order_items')}</h2>
            <div className="items">
              {order.items?.map((item, i) => (
                <div key={i} className="item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.price} {t('dirham')}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="total">{t('total_price')}: {order.items?.reduce((sum, item) => sum + item.price, 0)} {t('dirham')}</h3>
          </div>

          <div className="invoice" ref={invoiceRef}>
            <h2>Gusto</h2>
            <p>Thank you for choosing Gusto. Here are your order details.</p>
            <div className="invoice-info">
              <p><strong>Order No:</strong> #{order.id}</p>
              <p><strong>Order Time:</strong> {order.date}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.quantity || 1}</td>
                    <td>{(item.price / (item.quantity || 1)).toFixed(2)}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="grand-total">Grand Total: {order.items?.reduce((sum, item) => sum + item.price, 0)} {t('dirham')}</h3>
            <div className="invoice-footer QrCode">
              {/* Only this QR Code will be displayed */}
              <QRCodeCanvas value="https://www.hespress.com/" size={100} />
              <p>Scan to visit our website</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
