import Image from "next/image";

export default function NewsletterPage() {
  return (
    <main className="mx-auto flex w-full max-w-[860px] flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <section className="bg-white px-2 py-4 sm:px-4">
        <div className="flex justify-center">
          <Image
            src="/images/wial-usa-placeholder-optimized-removebg-preview.png"
            alt="WIAL logo"
            width={128}
            height={66}
            className="h-auto w-[92px] sm:w-[108px]"
            priority
          />
        </div>

        <h1 className="mt-8 text-center text-[2rem] font-normal tracking-tight text-[#5b5b5b] sm:text-[2.15rem]">
          Join Our Newsletter
        </h1>

        <form className="mx-auto mt-10 max-w-[650px] space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-[0.95rem] font-normal text-[#5b5b5b] sm:text-[1rem]">
              <span className="mr-1.5 text-[#ff2e2e]">*</span>
              Email Address
            </span>
            <input
              type="email"
              className="h-[2.85rem] w-full rounded-[0.15rem] border border-[#c8c8c8] px-4 text-[0.98rem] shadow-[inset_0_1px_5px_rgba(0,0,0,0.12)] outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[0.95rem] font-normal text-[#5b5b5b] sm:text-[1rem]">
              <span className="mr-1.5 text-[#ff2e2e]">*</span>
              First Name
            </span>
            <input
              type="text"
              className="h-[2.85rem] w-full rounded-[0.15rem] border border-[#c8c8c8] px-4 text-[0.98rem] shadow-[inset_0_1px_5px_rgba(0,0,0,0.12)] outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[0.95rem] font-normal text-[#5b5b5b] sm:text-[1rem]">
              <span className="mr-1.5 text-[#ff2e2e]">*</span>
              Last Name
            </span>
            <input
              type="text"
              className="h-[2.85rem] w-full rounded-[0.15rem] border border-[#c8c8c8] px-4 text-[0.98rem] shadow-[inset_0_1px_5px_rgba(0,0,0,0.12)] outline-none"
              required
            />
          </label>

          <p className="pt-8 text-[0.82rem] leading-5 text-[#555]">
            By submitting this form, you are consenting to receive marketing
            emails from: WIAL, 1187 NEPTUNE PL, ANNAPOLIS, MD, 21409 United
            States, http://www.wial.org. You can revoke your consent to receive
            emails at any time by using the SafeUnsubscribe® link, found at the
            bottom of every email. Emails are serviced by Constant Contact.
          </p>

          <button
            type="submit"
            className="mt-1 w-full rounded-[0.2rem] bg-[#f5a51d] px-6 py-2.5 text-[0.96rem] font-semibold text-white transition hover:bg-[#db920f]"
          >
            Sign Up
          </button>
        </form>
      </section>
    </main>
  );
}
