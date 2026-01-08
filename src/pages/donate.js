import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function Donate() {
    const [copied, setCopied] = useState('');

    const bankDetails = {
        accountNumber: "1234567890",
        accountHolder: "Akurana UG & YG Association",
        bankName: "Bank of Ceylon",
        branch: "Akurana Branch"
    };

    const whatsappNumber = "+94771234567";

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className="body-back">
            <Navbar />
            <div className="container py-5" style={{ marginTop: '100px', minHeight: '100vh' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="donate-container">
                            <h1 className="text-center mb-4 heading display-4">Support Our Mission</h1>
                            <p className="text-center text-white mb-5" style={{ fontSize: '1.1rem' }}>
                                Your generous donation helps us empower undergraduates and young graduates 
                                in the Akurana community. Every contribution makes a difference!
                            </p>

                            {/* Bank Details Card */}
                            <div className="glass-card mb-4">
                                <h3 className="text-white mb-4">
                                    <i className="bi bi-bank2 me-2"></i>Bank Account Details
                                </h3>
                                
                                <div className="detail-row">
                                    <div className="detail-label">Bank Name:</div>
                                    <div className="detail-value">
                                        {bankDetails.bankName}
                                        <button 
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(bankDetails.bankName, 'bank')}
                                        >
                                            {copied === 'bank' ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                <div className="detail-row">
                                    <div className="detail-label">Branch:</div>
                                    <div className="detail-value">
                                        {bankDetails.branch}
                                        <button 
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(bankDetails.branch, 'branch')}
                                        >
                                            {copied === 'branch' ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                <div className="detail-row">
                                    <div className="detail-label">Account Holder:</div>
                                    <div className="detail-value">
                                        {bankDetails.accountHolder}
                                        <button 
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(bankDetails.accountHolder, 'holder')}
                                        >
                                            {copied === 'holder' ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                <div className="detail-row highlight-row">
                                    <div className="detail-label">Account Number:</div>
                                    <div className="detail-value" style={{ fontSize: '1.3rem', fontWeight: '600' }}>
                                        {bankDetails.accountNumber}
                                        <button 
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(bankDetails.accountNumber, 'account')}
                                        >
                                            {copied === 'account' ? '✓ Copied' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Share Receipt */}
                            <div className="glass-card">
                                <h3 className="text-white mb-3">
                                    <i className="bi bi-whatsapp me-2"></i>Share Your Receipt
                                </h3>
                                <p className="text-white mb-3" style={{ opacity: 0.9 }}>
                                    After making your donation, please share your payment receipt with us via WhatsApp. 
                                    This helps us keep track and send you a thank you message!
                                </p>
                                <a 
                                    href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="whatsapp-btn"
                                >
                                    <i className="bi bi-whatsapp me-2"></i>
                                    Share Receipt on WhatsApp
                                </a>
                                <p className="text-center text-white mt-3" style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                                    WhatsApp: {whatsappNumber}
                                </p>
                            </div>

                            {/* Thank You Message */}
                            <div className="text-center mt-5">
                                <p className="text-white" style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                                    🙏 Thank you for your generosity and support! 🙏
                                </p>
                                <a href="/" className="back-home-btn mt-3">
                                    <i className="bi bi-house-fill me-2"></i>Back to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
