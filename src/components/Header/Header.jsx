import React from 'react';
import styles from './Header.module.css';
import fitrition from '../../assets/Fitrition.svg';
import placeholderImage from '../../assets/profile_picture_placeholder.svg';

export default function Header({ type }) {
    return (
        <>
        {
            type === 'nutrition' ?
            <nav>
                <button>Log a Meal</button>
                <img class={styles.logo} alt="Fitrition Logo" src={fitrition}></img>
                <img class={styles.profile} alt="Placeholder Profile Image" src={placeholderImage}></img>
            </nav>
            :
            <nav>

            </nav>
        }
        </>
    )
}