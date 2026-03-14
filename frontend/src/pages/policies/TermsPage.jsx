import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-white" />
              <h1 className="font-heading text-4xl font-bold text-white">
                Terms & Conditions
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
                For the purpose of these Terms and Conditions, the terms "we", "us", and "our" refer to <strong>BEYONDERS GENZ VENTURES PRIVATE LIMITED</strong>, whose registered/operational office is Plot NO-321/2487, BJB College Cooperative Society, Azad Nagar, Bhubaneswar, Khorda, ODISHA 751002. The terms "you", "your", "user", or "visitor" refer to any natural or legal person who visits our website and/or agrees to purchase from us.
              </p>
              <p>
                Your use of the website and/or purchase from us is governed by the following Terms and Conditions:
              </p>
            </section>

            <Separator className="my-8" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">General</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>The content of the pages of this website is subject to change without notice.</li>
                <li>
                  Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                </li>
                <li>
                  Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It is your responsibility to ensure that any products, services or information available through our website meet your specific requirements.
                </li>
                <li>
                  Our website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                </li>
                <li>All trademarks reproduced on our website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
                <li>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offence.</li>
                <li className="text-slate-600 dark:text-slate-300">
                  From time to time our website may include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
                </li>
                <li className="text-slate-600 dark:text-slate-300">
                  You may not create a link to our website from another website or document without BEYONDERS GENZ VENTURES PRIVATE LIMITED's prior written consent.
                </li>
                <li className="text-slate-600 dark:text-slate-300">
                  Any dispute arising out of or in connection with your use of our website and/or purchase from us shall be governed by and construed in accordance with the laws of India.
                </li>
                <li className="text-slate-600 dark:text-slate-300">
                  We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any transaction, on account of the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
                </li>
              </ul>
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
