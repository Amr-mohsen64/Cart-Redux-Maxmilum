import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification'

let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisble);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    console.log(cart);

    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'sending',
        message: 'sending cart data',
      }))

      const response = await fetch("https://authmaxmilum-default-rtdb.firebaseio.com/cart.json",
        {
          method: 'PUT',
          body: JSON.stringify(cart)
        })

      if (!response.ok) {
        throw new Error("sending cart data falid")
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'sent cart data successfully',
      }))
    }

    if (isInitial) {
      isInitial = false
      return
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'sent cart data Faild',
      }))
    })

  }, [cart, dispatch])

  console.log(notification);
  return (
    <>
      {notification &&
        (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
