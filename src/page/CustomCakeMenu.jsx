import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const CustomCakeMenu = ({
  stepData,
  activeIndex,
  totalSteps,
  selectedValue,
  onSelectOption,
  onNext,
  onBack,
  subtotal,
}) => {

  const handleCheckOut = () => {
    const cakeData = window.cakeDataFromParent || {};
    console.log("Sending Cake Data to Flutter:", cakeData);

    // ✅ Send data to Flutter WebView
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler("onCakeDataSubmit", cakeData);
    }
  };

  return (
    <div className="w-full lg:w-1/2 p-4 lg:p-8 rounded-2xl bg-lightbrown flex flex-col justify-between text-yambrownfont ">
      <div className="flex justify-between items-center">
        <button
          onClick={handleCheckOut}
          className="bg-yambrownbutton hover:bg-yambrownbutton/80 text-white px-4 py-1 rounded-md font-medium cursor-pointer"
        >
          Check Out
        </button>
        <div className="text-right">
          <p className="text-sm">Sub Total</p>
          <p className="text-lg font-bold">{subtotal.toFixed(2)} Br</p>
        </div>
      </div>
      <hr className="my-3 border-yambrownfont/40" />
      <div>
        <div className="flex justify-between mb-2 font-semibold">
          <span>{stepData.title}</span>
          <span>Review Your Option</span>
        </div>
        {stepData.options.map((opt, idx) => {
          const isSelected = selectedValue === opt.value;
          const isColor = stepData.type === 'color';
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectOption(opt)}
              className="w-full flex justify-between items-center py-3 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className={[
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold border-2",
                    isSelected ? "ring-2 ring-yambrownbutton" : "ring-0",
                    isColor ? "" : "bg-yambrownbutton text-white border-transparent",
                  ].join(" ")}
                  style={isColor ? { backgroundColor: opt.value, borderColor: "transparent", color: "#fff" } : {}}
                  aria-hidden
                >
                  {isColor ? (isSelected ? "✓" : "") : opt.label}
                </div>
                <div className="text-left">
                  <div className="font-medium">{opt.title}</div>
                  {opt.description && <div className="text-sm opacity-70">{opt.description}</div>}
                </div>
              </div>
              <span className="font-medium">{opt.price.toFixed(2)} Br</span>
            </button>
          );
        })}
      </div>
      <hr className="my-3 border-yambrownfont/40" />
      <div className="flex justify-between items-center">
        <Button label={<ArrowLeft size={20} />} handleClick={onBack} />
        <span className="font-medium">{activeIndex + 1}/{totalSteps}</span>
        <Button label={<ArrowRight size={20} />} handleClick={onNext} />
      </div>
    </div>
  );
};

export default CustomCakeMenu;
