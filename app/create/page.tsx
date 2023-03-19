"use client";
import CreateClaim from "@/modules/createClaim";

const Create: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <div className="mb-[42px]">
          <h2 className="text-[36px] font-semibold">Prerequisites: </h2>
          <p>
            {" "}
            Download the Polygon ID Wallet App and create an Identity.( Worry
            about privacy leak? Please read the 'How does EveryLens work' to
            better understand the process :) )
          </p>
          <ul>
            <li>
              For Android:{" "}
              <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet">
                Polygon ID on Google Play
              </a>
            </li>
            <li>
              For IOS:{" "}
              <a href="https://apps.apple.com/us/app/polygon-id/id1629870183">
                Polygon ID on the App Store
              </a>
            </li>
          </ul>
        </div>
        <CreateClaim />
      </div>
      <AboutUs />
    </div>
  );
};
export default Create;

const AboutUs: React.FC = () => {
  return (
    <div>
      <p className="font-semibold text-[48px] leading-[67.2px]">
        How does EveryLens work?
      </p>
      <ul className="mt-[42px] text-[16px] leading-[22px]">
        <li>
          Basically, everyone posts via EveryLens is using the same lens
          profile, so nobody can distinguish who's the exactly poster and your
          identity is protected
        </li>
        <li>Then, take a deeper look at the process on EveryLens:</li>
        <li>
          When you come to EveryLens, first, you need to register. No worry or
          preasure, the register process is quite easy and privacy protected, we
          only check whether your address has a lens profile and create a
          verficiable credential for you. Furthormore, the whole process is off
          chain and we won't record anything of you, so your trace will not be
          tracked
        </li>
        <li>
          After the VC ( verficiable credential) is created for you, you need to
          download it with the Polygon ID app. Please don't share the VC with
          others and you need to refresh your vc regularly
        </li>
        <li>
          Now you got your VC! It's used to generate proof via Polygon ID that
          you hold a lens profile and only expose such a message!
        </li>
        <li>
          What's next? Just start posting on EveryLens. When you send post
          requests on EveryLens, you need to scan the QR on Polygon ID. Then the
          app will generate a proof and send it for our verifier contract to
          verify.Please, note that your polygon id address has no relevance with
          your address that holds lens profile. So will anyone knows it's you (
          the identity that holds the public lens profile) that posted on
          EveryLens. Of course No!{" "}
        </li>
        <li>
          Our verifier contract will verify your proof and if your proof shows
          you did hold a lens profile, then it will dispatch a pseudonym for you
          and posts what your content on Lens with EveryLensBot
        </li>
        <li>
          Wait a minute, I've interacted with blockchain, ain't my identity
          public?
        </li>
        <li>
          The request is sent by the address managed by your Polygon ID and it
          has NO RELEVANCE WITH YOUR ADDRESS THAT HOLDS YOUR PUBLIC LENS
          PROFILE! Besides, you can always create new address by removing your
          wallet from Polygon ID and create a new one. Then go back to EveryLens
          and claim a new VC. Boom! You just got your new cover. Who knows who
          the new cover represents! Nobody but yourself, lol{" "}
        </li>
        <li>
          Last but lease, to prevent abuse of EveryLens, every VC as a 7-day
          verifialbe time, which means you need to claim a new VC every 7 days
          :({" "}
        </li>
      </ul>
    </div>
  );
};
