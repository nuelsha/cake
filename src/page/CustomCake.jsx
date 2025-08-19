"use client"

import { useState, useRef, useMemo, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, OrthographicCamera, Html, useProgress } from "@react-three/drei"
import CustomCakeMenu from "./CustomCakeMenu"
import Filing from "./Filling"
import Cot from "./Cot"
import Plate from "./Plate"
import Base from "./Base"
import TopDecoration from "./TopDecoration"
import BottomDecoration from "./BottomDecoration"

const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-4 text-yambrownfont">
        {/* Animated circle loader */}
        <div className="w-12 h-12 border-4 border-yambrownfont border-t-transparent rounded-full animate-spin"></div>

        {/* Loading text with progress */}
        <p className="text-lg font-semibold animate-pulse">
          Loading... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  )
}

const CustomCake = () => {
  const [fillingColor, setFillingColor] = useState("#ffffff")
  const [cotColor, setCotColor] = useState("#ffffff")
  const [baseColor, setBaseColor] = useState("#ffffff")
  const [topDecorationColor, setTopDecorationColor] = useState("#ffffff")
  const [bottomDecorationColor, setBottomDecorationColor] = useState("#ffffff")

  const [isTopVisible, setIsTopVisible] = useState(true)
  const [isBottomVisible, setIsBottomVisible] = useState(true)

  const [activeIndex, setActiveIndex] = useState(0)
  const groupRef = useRef()

  const colorOptions = [
    { title: "Pink", description: "Soft & playful", value: "#FFB6C1", price: 100 },
    { title: "Blue", description: "Cool & bright", value: "#00B7EB", price: 120 },
    { title: "White", description: "Clean classic", value: "#FFFFFF", price: 80 },
  ]

  const includeOptions = (what) => [
    { title: `Include ${what}`, description: "", label: "✓", value: true, price: 150 },
    { title: `No ${what}`, description: "", label: "✕", value: false, price: 0 },
  ]

  const steps = [
    { title: "Filling Color", type: "color", setter: setFillingColor, selected: fillingColor, options: colorOptions },
    { title: "Base Color", type: "color", setter: setBaseColor, selected: baseColor, options: colorOptions },
    { title: "Cot Color", type: "color", setter: setCotColor, selected: cotColor, options: colorOptions },
    {
      title: "Top Decoration",
      type: "toggle",
      setter: setIsTopVisible,
      selected: isTopVisible,
      options: includeOptions("Top Decoration"),
    },
    {
      title: "Top Decoration Color",
      type: "color",
      setter: setTopDecorationColor,
      selected: topDecorationColor,
      options: colorOptions,
    },
    {
      title: "Bottom Decoration",
      type: "toggle",
      setter: setIsBottomVisible,
      selected: isBottomVisible,
      options: includeOptions("Bottom Decoration"),
    },
    {
      title: "Bottom Decoration Color",
      type: "color",
      setter: setBottomDecorationColor,
      selected: bottomDecorationColor,
      options: colorOptions,
    },
  ]

  const handleSelectOption = (stepIdx, opt) => {
    const step = steps[stepIdx]
    if (step.type === "color") step.setter(opt.value)
    else if (step.type === "toggle") step.setter(Boolean(opt.value))
  }

  const next = () => setActiveIndex((i) => (i + 1) % steps.length)
  const back = () => setActiveIndex((i) => (i - 1 + steps.length) % steps.length)

  const subtotal = useMemo(() => {
    return steps.reduce((total, step) => {
      const selectedOption = step.options.find((opt) =>
        step.type === "color" ? opt.value === step.selected : opt.value === step.selected,
      )
      return total + (selectedOption?.price || 0)
    }, 0)
  }, [fillingColor, cotColor, baseColor, topDecorationColor, bottomDecorationColor, isTopVisible, isBottomVisible])

  const cakeData = {
    fillingColor,
    cotColor,
    baseColor,
    topDecorationColor,
    bottomDecorationColor,
    isTopVisible,
    isBottomVisible,
    subtotal,
  }

  useEffect(() => {
    window.cakeDataFromParent = cakeData
  }, [
    fillingColor,
    cotColor,
    baseColor,
    topDecorationColor,
    bottomDecorationColor,
    isTopVisible,
    isBottomVisible,
    subtotal,
  ])

  return (
    <div className="min-h-screen flex flex-col">
  <header className="py-4 px-6 bg-lightbrown text-yambrownfont flex items-center justify-center">
  <p className="text-yambrownfont text-xl font-semibold">Craft your dream cake now</p>
</header>


      <div className="flex flex-col lg:flex-row gap-6 p-6 flex-grow">
        {/* LEFT: 3D Canvas */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-140px)] rounded-2xl overflow-hidden">
          <Canvas className="w-full h-full" dpr={[1, 1.5]}>
            <Suspense fallback={<Loader />}>
              <pointLight position={[0, 5, 0]} intensity={50} />
              <spotLight position={[0, 5, 0]} angle={0.3} penumbra={0.4} />
              <Environment preset="city" background={false} />

              <group ref={groupRef} rotation={[0, Math.PI, 0]}>
                <TopDecoration color={topDecorationColor} isVisible={isTopVisible} />
                <Filing color={fillingColor} />
                <Cot color={cotColor} />
                <Base color={baseColor} />
                <BottomDecoration color={bottomDecorationColor} isVisible={isBottomVisible} />
                <Plate />
              </group>

              <OrthographicCamera position={[50, 20, 0]} />
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={3.5}
                maxDistance={4}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2.5}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* RIGHT: Menu */}
        <div className="w-full lg:w-1/2">
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
    </div>
  )
}

export default CustomCake
