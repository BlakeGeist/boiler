import React from 'react'
import Layout from 'components/Layout'
import Head from 'next/head'

const Terms = ({ site }) => {
    return (
        <>
            <Head>
                <title>Privacy Policy </title>
            </Head>

            <Layout site={site}>
                <Layout.Main>

                    <h1>Privacy Policy</h1>

                    <p>We are committed to protecting your privacy. This Privacy Policy (the &quot;Policy&quot;) describes how we collect, use, and disclose information about you when you use our website located at [insert website URL] (the &quot;Website&quot;), which is owned and operated by [insert company name] (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).</p>

                    <h2>Information We Collect</h2>
                    <p>We may collect information about you when you use our Website, including:</p>

                    <p>Information you provide: We may collect personal information you provide to us, such as your name, email address, and phone number, when you create an account or contact us.</p>

                    <p>Usage data: We may collect information about your use of the Website, such as the pages you visit and the actions you take, using cookies and similar technologies.</p>

                    <h2>How We Use Your Information</h2>

                    <h3>We may use your information for the following purposes:</h3>

                    <ul>
                        <li>
                            <p>To operate and improve the Website;</p>
                        </li>
                        <li>
                            <p>To provide customer support and respond to your inquiries;</p>
                        </li>
                        <li>
                            <p>To communicate with you about our services;</p>
                        </li>
                        <li>
                            <p>To personalize your experience on the Website;</p>
                        </li>
                        <li>
                            <p>To analyze and improve the Website&apos;s performance and user experience;</p>
                        </li>
                        <li>
                            <p>To enforce our policies and protect our rights;</p>
                        </li>
                        <li>
                            <p>To comply with applicable laws and regulations.</p>
                        </li>
                    </ul>

                    <h2>Sharing of Your Information</h2>

                    <p>We may share your information with third parties in the following circumstances:</p>

                    <ul>
                        <li>
                            <p>Service providers: We may share your information with third-party service providers who perform services on our behalf, such as website hosting, data analysis, and customer service.</p>
                        </li>
                        <li>
                            <p>Legal purposes: We may disclose your information in response to a subpoena, court order, or other governmental request.</p>
                        </li>
                        <li>
                            <p>Business transfers: We may share your information in connection with a merger, acquisition, or other business transfer.</p>
                        </li>
                    </ul>

                    <h2>Your Choices</h2>
                    <p>You can choose not to provide certain information to us, but this may limit your ability to use certain features of the Website.</p>

                    <p>You can opt-out of receiving marketing communications from us by following the instructions in the communication.</p>

                    <p>You can also disable cookies in your browser settings, but this may limit your ability to use certain features of the Website.</p>

                    <h2>Data Security</h2>
                    <p>We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no data security measures can guarantee 100% security.</p>

                    <h2>Children&apos;s Privacy</h2>
                    <p>Our Website is not directed to children under the age of 13, and we do not knowingly collect personal information from children under the age of 13. If we learn that we have collected personal information of a child under the age of 13, we will take steps to delete such information as soon as possible.</p>

                    <h2>Changes to the Policy</h2>
                    <p>We may update this Policy from time to time. If we make any material changes to the Policy, we will notify you by posting a notice on the Website or by sending an email to the email address associated with your account. Your continued use of the Website after any such changes constitutes your acceptance of the new Policy.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about this Policy, please contact us at [insert contact information].</p>

                </Layout.Main>
                <Layout.Aside />
            </Layout>            
        </>
    )
}

export default Terms