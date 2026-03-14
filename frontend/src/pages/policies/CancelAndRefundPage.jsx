import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CancelAndRefundPage() {
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
              <RefreshCw className="w-8 h-8 text-white" />
              <h1 className="font-heading text-4xl font-bold text-white">
                Cancellation & Refund Policy
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
                <strong>BEYONDERS GENZ VENTURES PRIVATE LIMITED</strong> believes in helping its customers as much as possible and therefore follows a liberal cancellation policy. Under this policy:
              </p>
            </section>

            <Separator className="my-8" />

            <section>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  Cancellations will be considered only if the request is made within same day of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them. 
                </li>
                <li>
                  <strong>BEYONDERS GENZ VENTURES PRIVATE LIMITED</strong> does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
                </li>
                <li>
                  In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within same day of receipt of the products. 
                </li>
                <li>
                  In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision. 
                </li>
                <li>
                  In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
                </li>
                <li>
                  In case of any Refunds approved by the BEYONDERS GENZ VENTURES PRIVATE LIMITED, it'll take same day for the refund to be processed to the end customer.
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
