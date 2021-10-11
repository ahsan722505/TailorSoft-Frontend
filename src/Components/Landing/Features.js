import React from 'react'
import styles from "./Features.module.css";

const Features = () => {
    return (
        <div className={styles.features}>
            <h1>Features:</h1>
            <div>
                <h2>
                    Create Orders
                </h2>
                <p>
                    In tailorSoft, you can create new orders by taking the complete information about your customer and their stitch details. Like their measurements, their name and email and the stitch details of their clothe.
                </p>
                <hr/>
            </div>
            <div>
                <h2>
                    Automated Emails
                </h2>
                <p>
                    When you will complete an order then an automated email will be sent to your customer about the completion of their order.
                </p>
                <hr/>
            </div>
            <div>
                <h2>
                    Orders of existing clients
                </h2>
                <p>
                    If there is a customer who have visited you before then you can get the details of that customer by using the search by name field during creating a new order.
                </p>
                <hr/>
            </div>
            <div>
                <h2>
                    Pending Orders
                </h2>
                <p>
                    You can keep track of orders that are pending, you can edit them, you can delete them and many more.
                </p>
                <hr/>
            </div>
            <div>
                <h2>
                    Email Clients
                </h2>
                <p>
                  You can email your customer using this application. You will be provided a search by name field by typing name you will get the email and other details of customer to whom you want to send email.
                </p>
                {/* <hr/> */}
            </div>
        </div>
    )
}

export default Features
