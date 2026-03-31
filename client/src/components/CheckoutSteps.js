import { Link } from 'react-router-dom';
import './CheckoutSteps.css';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="checkout-steps-container">
            <div className={`step-item ${step1 ? 'completed-step' : 'disabled-step'} ${step1 && !step2 ? 'active-step' : ''}`}>
                {step1 ? (
                    <Link to='/login' className="text-decoration-none d-flex flex-column align-items-center">
                        <div className="step-number">1</div>
                        <div className="step-label">Login</div>
                    </Link>
                ) : (
                    <>
                        <div className="step-number">1</div>
                        <div className="step-label">Login</div>
                    </>
                )}
            </div>

            <div className={`step-item ${step2 ? (step3 ? 'completed-step' : 'active-step') : 'disabled-step'}`}>
                {step2 ? (
                    <Link to='/shipping' className="text-decoration-none d-flex flex-column align-items-center">
                        <div className="step-number">2</div>
                        <div className="step-label">Shipping</div>
                    </Link>
                ) : (
                    <>
                        <div className="step-number">2</div>
                        <div className="step-label">Shipping</div>
                    </>
                )}
            </div>

            <div className={`step-item ${step3 ? (step4 ? 'completed-step' : 'active-step') : 'disabled-step'}`}>
                {step3 ? (
                    <Link to='/payment' className="text-decoration-none d-flex flex-column align-items-center">
                        <div className="step-number">3</div>
                        <div className="step-label">Payment</div>
                    </Link>
                ) : (
                    <>
                        <div className="step-number">3</div>
                        <div className="step-label">Payment</div>
                    </>
                )}
            </div>

            <div className={`step-item ${step4 ? 'active-step' : 'disabled-step'}`}>
                {step4 ? (
                    <Link to='/placeorder' className="text-decoration-none d-flex flex-column align-items-center">
                        <div className="step-number">4</div>
                        <div className="step-label">Place Order</div>
                    </Link>
                ) : (
                    <>
                        <div className="step-number">4</div>
                        <div className="step-label">Place Order</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutSteps;
