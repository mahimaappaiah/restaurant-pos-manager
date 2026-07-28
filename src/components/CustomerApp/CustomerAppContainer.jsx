import React from "react";
import { useResto } from "../../context/RestoContext";
import { CaptivePortal } from "./CaptivePortal";
import { TableConfirm } from "./TableConfirm";
import { MenuBrowser } from "./MenuBrowser";
import { OrderTracker } from "./OrderTracker";
import { CustomerBillPay } from "./CustomerBillPay";
import { CustomerFeedback } from "./CustomerFeedback";

export const CustomerAppContainer = () => {
  const { customerView, setCustomerView } = useResto();

  return (
    <div className="customer-app-shell">
      <div className="customer-mobile-wrapper">
        {customerView === "portal" && (
          <CaptivePortal onNext={() => setCustomerView("splash")} />
        )}
        {customerView === "splash" && (
          <TableConfirm onNext={() => setCustomerView("menu")} />
        )}
        {customerView === "menu" && (
          <MenuBrowser
            onProceedTracker={() => setCustomerView("tracker")}
            onProceedBill={() => setCustomerView("bill")}
          />
        )}
        {customerView === "tracker" && (
          <OrderTracker
            onOrderMore={() => setCustomerView("menu")}
            onPayBill={() => setCustomerView("bill")}
          />
        )}
        {customerView === "bill" && (
          <CustomerBillPay onProceedFeedback={() => setCustomerView("feedback")} />
        )}
        {customerView === "feedback" && (
          <CustomerFeedback onComplete={() => setCustomerView("portal")} />
        )}
      </div>
    </div>
  );
};
