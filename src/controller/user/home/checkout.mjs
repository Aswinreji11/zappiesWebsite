import {findAllUserAddresses, findDefaultUserAddressUsingPopulate} from "../../../data/users/find.mjs";
import { findAllCartDatas } from "../../../data/cart/find.mjs";
import { updateCartTotalPriceInCheckoutPage } from "../../../data/cart/update.mjs";


export const user_checkoutGet = async (req, res) => {

    try {
        const walletAmount = 1000
        const userId = req.session.USER_ID
        let cartDatas = await findAllCartDatas(userId)
        console.log(cartDatas.couponDiscount,'coupon discount is showing');
        console.log(cartDatas,'cart data is showing');
        let totalPrice = Number(req.query.totalPrice)
        let updatedTotalPrice = totalPrice - (totalPrice * cartDatas.couponDiscount/100)
        const defaultAddress = await findDefaultUserAddressUsingPopulate(userId)
        const userDatas = await findAllUserAddresses(userId)
        console.log(userDatas,'addreses is showing')
        console.log(totalPrice,'what is happening');
        console.log(updatedTotalPrice,'update total price is showing');
        if(cartDatas.couponDiscount && updatedTotalPrice !== cartDatas.totalPrice){
            console.log('what i happened why it not entered inside if statement');
            const total = cartDatas.totalPrice - (cartDatas.totalPrice * (cartDatas.couponDiscount/100))
            const totalPrice = total.toFixed(2)
            await updateCartTotalPriceInCheckoutPage(userId,totalPrice)
            console.log(cartDatas,'cart data is updated');
            cartDatas = await findAllCartDatas(userId)  
            console.log(cartDatas,'is it working or not ');
        }
        
        res.render('checkout', {defaultAddress,cartDatas,totalPrice,userDatas,walletAmount})

    } catch (error) {
        console.error(error, 'USER CHECKOUT GET')
    }
}
