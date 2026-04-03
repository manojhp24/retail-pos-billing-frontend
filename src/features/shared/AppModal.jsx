import { Fragment, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { History, X } from "lucide-react";

export const AppModal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    icon,
    children,
}) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">

            <div className="fixed inset-0 bg-black/40" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-2xl shadow-xl bg-white border border-gray-200">

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                                {icon}
                            </div>

                            <div>
                                <DialogTitle className="text-sm font-semibold text-gray-800">
                                    {title}
                                </DialogTitle>
                                <p className="text-xs text-gray-400">{subtitle}</p>
                            </div>
                        </div>

                        <button onClick={onClose}>
                            <X size={16} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-5">{children}</div>

                </DialogPanel>
            </div>
        </Dialog>
    );
};
