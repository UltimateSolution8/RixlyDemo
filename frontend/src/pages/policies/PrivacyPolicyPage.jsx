import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-white" />
              <h1 className="font-heading text-4xl font-bold text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="text-teal-100">
              Last updated: 10th December 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="space-y-4 text-gray-700">
              <p>
                This privacy policy sets out how <strong>BEYONDERS GENZ VENTURES PRIVATE LIMITED</strong> uses and protects any information that you give BEYONDERS GENZ VENTURES PRIVATE LIMITED when you visit their website and/or agree to purchase from them.
              </p>
              <p>
                BEYONDERS GENZ VENTURES PRIVATE LIMITED is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.
              </p>
              <p>
                BEYONDERS GENZ VENTURES PRIVATE LIMITED may change this policy from time to time by updating this page. You should check this page periodically to ensure that you are aware of any changes.
              </p>
            </section>

            <Separator className="my-8" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Information We May Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Name</li>
                <li>Contact information including email address</li>
                <li>Demographic information such as postcode, preferences, and interests</li>
                <li>Other information relevant to customer surveys and/or offers</li>
              </ul>
            </section>

            <Separator className="my-8" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What We Do With the Information We Gather</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Internal record keeping.</li>
                <li>We may use the information to improve our products and services.</li>
                <li>We may periodically send promotional emails about new products, special offers, or other information we think you may find interesting using the email address you have provided.</li>
                <li>From time to time, we may also use your information to contact you for market research purposes via email, phone, fax, or mail.</li>
                <li>We may use the information to customise the website according to your interests.</li>
              </ul>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have implemented suitable measures.
              </p>
            </section>

            <Separator className="my-8" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How We Use Cookies</h2>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences. 
              </p>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
              </p>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                Overall, cookies help us provide you with a better website, by enabling us to 4 monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. 
              </p>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website. 
              </p>
            </section>

            <Separator className="my-8" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Controlling Your Personal Information</h2>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                You may choose to restrict the collection or use of your personal information in the following ways: 
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes
                </li>
                <li>
                  if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at <strong>admin@userixly.com</strong>.
                </li>
              </ul>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen. 
              </p>
            </section>

            <Separator className="my-8" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Correction of Incorrect Information</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                If you believe that any information we are holding on you is incorrect or incomplete, please write to below address as soon as possible. We will promptly correct any information found to be incorrect.  
              </p>
              <p className="mt-4 text-slate-600 dark:text-slate-300 font-semibold">
                Plot NO- 321/2487, BJB College Cooperative Society, Azad Nagar Khorda, ODISHA 751002
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                Phone: 8249467209<br />Email: <a className="text-teal-600 hover:underline" href="mailto:admin@userixly.com">admin@userixly.com</a>
              </p>
              <p className="text-slate-600 dark:text-slate-300">We will promptly correct any information found to be incorrect.</p>
            </section>

            <Separator className="my-8" />

            <footer className="text-center text-sm text-gray-500">
              <p>&copy; 2025 BEYONDERS GENZ VENTURES PRIVATE LIMITED. All rights reserved.</p>
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
