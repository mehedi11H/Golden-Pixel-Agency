import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    
    // পপআপ এলিমেন্ট ধরা
    const orderModal = document.getElementById("orderModal");
    const formModal = document.getElementById("formModal");
    
    const closeOrderModal = document.getElementById("closeOrderModal");
    const closeFormModal = document.getElementById("closeFormModal");
    const paidBtn = document.getElementById("paidBtn");
    
    // "অর্ডার করুন" বাটনে ক্লিক করলে ১ম পপআপ (পেমেন্ট তথ্য) খুলবে
    document.querySelectorAll(".open-order-btn").forEach(button => {
        button.addEventListener("click", () => {
            orderModal.style.display = "block";
        });
    });
    
    // ক্রস বাটনে ক্লিক করলে ১ম পপআপ বন্ধ
    if(closeOrderModal) closeOrderModal.addEventListener("click", () => orderModal.style.display = "none");
    
    // ক্রস বাটনে ক্লিক করলে ২য় পপআপ বন্ধ
    if(closeFormModal) closeFormModal.addEventListener("click", () => formModal.style.display = "none");
    
    // "আমি পেমেন্ট করেছি" বাটনে ক্লিক করলে ১ম টি বন্ধ হয়ে ২য় টি (ফর্ম) খুলবে
    if(paidBtn) {
        paidBtn.addEventListener("click", () => {
            orderModal.style.display = "none";
            formModal.style.display = "block";
        });
    }
    
    // অর্ডার আইডি তৈরি করার ফাংশন
    function generateUniqueOrderID() {
        return "GP-" + Math.floor(100000 + Math.random() * 900000);
    }

    // অর্ডার ফর্ম সাবমিশন
    const orderSubmitForm = document.getElementById("orderSubmitForm");
    if (orderSubmitForm) {
        orderSubmitForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById("submitOrderBtn");
            submitBtn.disabled = true;
            submitBtn.innerText = "প্রসেসিং হচ্ছে...";
            
            const generatedID = generateUniqueOrderID();
            
            const orderPayload = {
                orderID: generatedID,
                name: document.getElementById("custName").value.trim(),
                whatsapp: document.getElementById("custWA").value.trim(),
                fbLink: document.getElementById("fbLink").value.trim(),
                paymentMethod: document.getElementById("payMethod").value,
                paidFrom: document.getElementById("payNumber").value.trim(),
                trxID: document.getElementById("trxID").value.trim(),
                status: "Payment Pending",
                timestamp: serverTimestamp()
            };
            
            try {
                await addDoc(collection(db, "orders"), orderPayload);
                alert(`🎉 সফলভাবে আপনার অর্ডারটি সাবমিট হয়েছে!\n\nআপনার অর্ডার আইডি: ${generatedID}\n\nঅনুগ্রহ করে আইডিটি কপি করে রাখুন।`);
                formModal.style.display = "none";
                orderSubmitForm.reset();
            } catch (error) {
                alert("দুঃখিত! সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = "অর্ডার নিশ্চিত করুন";
            }
        });
    }
});