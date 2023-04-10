import TwitterEditorSvg from "@/app/user/components/post-editor/TwitterEditorSvg";
import LinkedInEditorSvg from "@/app/user/components/post-editor/LinkedInEditorSvg";
import { ProviderWithDisplayName } from "@/lib/infrastructure/cockroach/CockroachUserRepository";
import UnknownProviderSvg from "@/app/(landing)/partials/providers/UnknownProviderSvg";

export default function LinkedInPreview({
  content,
  providerWithDisplayNames,
}: {
  content: string[];
  providerWithDisplayNames: ProviderWithDisplayName[];
}) {
  const messages = content;

  const imagePreviewIconsWithDisplayName = providerWithDisplayNames.map(
    (account) => {
      let icon;
      if (account.provider === "twitter") {
        icon = <TwitterEditorSvg />;
      } else if (account.provider === "linkedin") {
        icon = <LinkedInEditorSvg />;
      } else {
        icon = <UnknownProviderSvg />;
      }

      return {
        icon: icon,
        displayName: account.displayName,
      };
    }
  );

  return (
    <div className="rounded-sm border-slate-200 divide-y divide-slate-200">
      {messages.map((message, index) => {
        return (
          <div key={message + index} className="mb-5">
            {/* Header */}
            {}
            {/* Body */}
            <div
              className={
                "bg-gradient-to-r from-gray-100 to-gray-200  text-sm text-slate-800 space-y-2 whitespace-pre-line " +
                "p-8"
              }
            >
              <div>{message}</div>
              <div className="flex w-full align-middle justify-center p-3 font-architects-daughter">
                {imagePreviewIconsWithDisplayName.map((preview, index) => (
                  <div
                    key={preview.displayName + index}
                    className="flex align-middle justify-center text-slate-600 mx-3 mt-5"
                  >
                    <div className="stroke-slate-600 mt-0.5 mr-1">
                      {preview.icon}
                    </div>
                    <div>{preview.displayName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
