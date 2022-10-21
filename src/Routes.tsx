import React, { lazy, useContext } from 'react';
import { Location, Action } from 'history';

// @ts-ignore
import { LoginCallback, SecureRoute } from '@okta/okta-react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CheckoutProvider from 'Checkout/CheckoutProvider';
import CreditCardProvider from 'CreditCard/CreditCardProvider';

import Account from 'Account';
import AboutUs from 'AboutUs';
import Company from 'Company';
import BrandPage from 'Brands';
import Cart from 'Cart';
import Checkout from 'Checkout';
import Contract from 'Contract';
import CreditCardCallback from 'CreditCard/CreditCardCallback';
import CreditForms from 'CreditForms';
import CustomerApproval from 'CustomerApproval';
import Contracts from 'Contracts';
import DoNotSellMyInfo from 'Legal/DoNotSellMyInfo';
import ErrorComponent from 'common/ErrorBoundary/ErrorComponent';
import FeatureToggle from 'FeatureToggle';
import ForgotPassword from 'ForgotPassword';
import Home from 'Home';
import Invoice from 'Invoice';
import Invoices from 'Invoices';
import Invite from 'Invite';
import Legal from 'Legal';
import LocationSearch from 'LocationSearch';
import Login from 'Login';
import Lists from 'Lists';
import ListUpload from 'Lists/Upload';
import Logout from 'Logout';
import MigrationSetupMessage from 'Account/MigrationSetupMessage';
import Order from 'Order';
import Orders from 'Orders';
import PaymentInformation from 'PaymentInformation';
import Portal from 'Portal';
import PreviouslyPurchasedProducts from 'PreviouslyPurchasedProducts';
import PurchaseApprovals from 'PurchaseApprovals';
import PoshMarketing from 'Brands/Posh';
import Product from 'Product';
import Quote from 'Quote';
import Quotes from 'Quotes';
import RegisterPage from 'Register';
import ReviewPurchase from 'PurchaseApprovals/ReviewPurchase';
import Search from 'Search';
import SelectAccounts from 'SelectAccounts';
import Support from 'Support';
import User from 'User';
import UserManagement from 'UserManagement';
import VerifyEmail from 'Register/VerifyEmail';
import WorksForYou from 'WorksForYou';
import NavigationAlert from 'common/Alerts/NavigationAlert';
import { CartContext } from 'Cart/CartProvider';
import BigDogMarketing from 'Brands/BigDog';

/**
 * Lazy Loaded Components
 */
const JobForm = lazy(() => import('./JobForm'));

function Routes() {
  const { clearContract } = useContext(CartContext);

  return (
    <>
      <NavigationAlert when={showContractNavPrompt} onConfirm={clearContract} />
      <Switch>
        {/* Unsecure Routes */}
        <Route path="/error" exact component={ErrorComponent} />
        <Route path="/" exact component={Home} />
        <Route exact path="/product/:slug?/:id" component={Product} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route path="/search" component={Search} />
        <Route path="/privacy-policy" component={Legal} />
        <Route path="/terms-of-access" component={Legal} />
        <Route path="/terms-of-sale" component={Legal} />
        <Route path="/do-not-sell-my-info" component={DoNotSellMyInfo} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/location-search" component={LocationSearch} />
        <Route exact path="/support" component={Support} />
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/verify" component={VerifyEmail} />
        <Route path="/credit_callback" component={CreditCardCallback} />
        <Route path="/max-welcome" component={MigrationSetupMessage} />
        <Route exact path="/credit-forms" component={CreditForms} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/works-for-you" component={WorksForYou} />
        <Route exact path="/brands/posh" component={PoshMarketing} />
        <Route exact path="/brands/bigdog" component={BigDogMarketing} />
        <Route exact path="/brands" component={BrandPage} />
        <Route exact path="/jobform" component={JobForm} />

        {/* Secured Routes */}
        <SecureRoute exact path="/invite-user" component={Invite} />
        <SecureRoute exact path="/account" component={Account} />
        <SecureRoute exact path="/cart" component={Cart} />
        <SecureRoute exact path="/checkout">
          <CheckoutProvider>
            <CreditCardProvider>
              <Checkout />
            </CreditCardProvider>
          </CheckoutProvider>
        </SecureRoute>
        <SecureRoute
          exact
          path="/customer-approval"
          component={CustomerApproval}
        />
        <SecureRoute exact path="/contract/:id" component={Contract} />
        <SecureRoute exact path="/invoice/:id" component={Invoice} />
        <SecureRoute exact path="/invoices" component={Invoices} />
        <SecureRoute exact path="/lists" component={Lists} />
        <SecureRoute exact path="/lists/upload" component={ListUpload} />
        <SecureRoute exact path="/payment-information">
          <CreditCardProvider>
            <PaymentInformation />
          </CreditCardProvider>
        </SecureRoute>
        <SecureRoute exact path="/portal" component={Portal} />
        <SecureRoute exact path="/order/:id" component={Order} />
        <SecureRoute exact path="/orders" component={Orders} />
        <SecureRoute exact path="/contracts" component={Contracts} />
        <SecureRoute
          exact
          path="/previously-purchased-products"
          component={PreviouslyPurchasedProducts}
        />
        <SecureRoute
          exact
          path="/purchase-approvals"
          component={PurchaseApprovals}
        />
        <SecureRoute
          exact
          path="/purchase-approvals/:id"
          component={ReviewPurchase}
        />
        <SecureRoute exact path="/quote/:id" component={Quote} />
        <SecureRoute exact path="/quotes" component={Quotes} />
        <SecureRoute exact path="/job-form" component={JobForm} />
        <SecureRoute exact path="/user-management" component={UserManagement} />
        <SecureRoute path="/select-accounts" component={SelectAccounts} />
        <SecureRoute exact path="/features" component={FeatureToggle} />
        <Redirect to="/" />
      </Switch>
    </>
  );

  function showContractNavPrompt(
    pLocation: Location<any>,
    nLocation: Location<any> | undefined,
    action?: Action
  ): boolean {
    if (pLocation.pathname === nLocation?.pathname) return false;
    if (nLocation?.state?.ignoreNavAlertForPrev) return false;
    if (action === 'POP') return false;
    if (nLocation?.pathname?.includes('/checkout')) return false;
    return pLocation?.state?.canShowNavAlert;
  }
}

export default Routes;
