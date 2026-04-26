"use client";

import { useLaunchMode } from "./LaunchState";
import BookingDialog from "./BookingDialog";

export default function GlobalBookingDialog() {
  const { dialogOpen, closeDialog } = useLaunchMode();
  return <BookingDialog open={dialogOpen} onClose={closeDialog} />;
}
