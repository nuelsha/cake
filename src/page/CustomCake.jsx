import { useState, useRef, useMemo, useEffect } from 'react';
import CustomCakeMenu from './CustomCakeMenu';
// ❌ We removed Three.js imports since you said you only want data for Flutter

const CustomCake = () => {
  // ----------------------------
  // 1. States for cake parts
  // ----------------------------
  const [fillingColor, setFillingColor] = useState('#ffffff');
  const [cotColor, setCotColor] = useState('#ffffff');
  const [baseColor, setBaseColor] = useState('#ffffff');
  const [topDecorationColor, setTopDecorationColor] = useState('#ffffff');
  const [bottomDecorationColor, setBottomDecorationColor] = useState('#ffffff');

  const [isTopVisible, setIsTopVisible] = useState(true);
  const [isBottomVisible, setIsBottomVisible] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const groupRef = useRef();

  // ----------------------------
  // 2. Options
  // ----------------------------
  const colorOptions = [
    { title: 'Pink', description: 'Soft & playful', value: '#FFB6C1', price: 100 },
    { title: 'Blue', description: 'Cool & bright', value: '#00B7EB', price: 120 },
    { title: 'White', description: 'Clean classic', value: '#FFFFFF', price: 80 },
  ];

  const includeOptions = (what) => ([
    { title: `Include ${what}`, description: '', label: '✓', value: true, price: 150 },
    { title: `No ${what}`, description: '', label: '✕', value: false, price: 0 },
  ]);

  const steps = [
    { title: 'Filling Color', type: 'color', setter: setFillingColor, selected: fillingColor, options: colorOptions },
    { title: 'Base Color', type: 'color', setter: setBaseColor, selected: baseColor, options: colorOptions },
    { title: 'Cot Color', type: 'color', setter: setCotColor, selected: cotColor, options: colorOptions },
    { title: 'Top Decoration', type: 'toggle', setter: setIsTopVisible, selected: isTopVisible, options: includeOptions('Top Decoration') },
    { title: 'Top Decoration Color', type: 'color', setter: setTopDecorationColor, selected: topDecorationColor, options: colorOptions },
    { title: 'Bottom Decoration', type: 'toggle', setter: setIsBottomVisible, selected: isBottomVisible, options: includeOptions('Bottom Decoration') },
    { title: 'Bottom Decoration Color', type: 'color', setter: setBottomDecorationColor, selected: bottomDecorationColor, options: colorOptions },
  ];

  // ----------------------------
  // 3. Navigation
  // ----------------------------
  const handleSelectOption = (stepIdx, opt) => {
    const step = steps[stepIdx];
    if (step.type === 'color') step.setter(opt.value);
    else if (step.type === 'toggle') step.setter(Boolean(opt.value));
  };

  const next = () => setActiveIndex((i) => (i + 1) % steps.length);
  const back = () => setActiveIndex((i) => (i - 1 + steps.length) % steps.length);

  // ----------------------------
  // 4. Calculate subtotal
  // ----------------------------
  const subtotal = useMemo(() => {
    return steps.reduce((total, step) => {
      const selectedOption = step.options.find(opt =>
        step.type === 'color' ? opt.value === step.selected : opt.value === step.selected
      );
      return total + (selectedOption?.price || 0);
    }, 0);
  }, [steps]);

  // ----------------------------
  // 5. Prepare cake data to send to Flutter
  // ----------------------------
  const cakeData = {
    fillingColor,
    cotColor,
    baseColor,
    topDecorationColor,
    bottomDecorationColor,
    isTopVisible,
    isBottomVisible,
    subtotal
  };

  // Make it available globally for CustomCakeMenu
  useEffect(() => {
    window.cakeDataFromParent = cakeData;
  }, [cakeData]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4">
        <p className="text-yambrownfont text-xl font-semibold">Craft your dream cake now</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 p-6 flex-grow">
        {/* ❌ 3D Canvas Removed */}
        <CustomCakeMenu
          stepData={steps[activeIndex]}
          activeIndex={activeIndex}
          totalSteps={steps.length}
          selectedValue={steps[activeIndex].selected}
          onSelectOption={(opt) => handleSelectOption(activeIndex, opt)}
          onNext={next}
          onBack={back}
          subtotal={subtotal}
        />
      </div>
    </div>
  );
};

export default CustomCake;
