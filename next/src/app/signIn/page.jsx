import { SignInForm, SignUpForm } from "@/app/components/form/form";
import styles from '@/app/styles/form.module.scss';

export const metadata = {
    title: 'Sign in',
};

const SignInPage = () => {
    
    return (
        <div className="center-container">
            <div className={styles.form__wrapper}>
                <SignInForm/>
                <hr/>
                <SignUpForm/>
            </div>
        </div>
    )
}


export default SignInPage;