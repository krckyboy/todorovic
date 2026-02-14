import AppKit

let defaultOutputPath = FileManager.default.currentDirectoryPath + "/public/og-default.png"
let outputPath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : defaultOutputPath

func colorFromHex(_ hex: String, alpha: CGFloat = 1.0) -> NSColor {
  let cleaned = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
  guard cleaned.count == 6, let value = UInt32(cleaned, radix: 16) else {
    fatalError("Invalid hex color: \(hex)")
  }

  let red = CGFloat((value >> 16) & 0xFF) / 255
  let green = CGFloat((value >> 8) & 0xFF) / 255
  let blue = CGFloat(value & 0xFF) / 255
  return NSColor(calibratedRed: red, green: green, blue: blue, alpha: alpha)
}

// Dark-mode color tokens from src/styles/global.css
let tokenBackground = colorFromHex("#121212")
let tokenBackgroundAlt = colorFromHex("#1e1e1e")
let tokenText = colorFromHex("#f5f5f5")
let tokenTextMuted = colorFromHex("#9ca3af")
let tokenPrimary = colorFromHex("#f97316")
let tokenPrimaryLight = colorFromHex("#fb923c")
let tokenPrimaryDark = colorFromHex("#ea580c")
let tokenBorder = colorFromHex("#404040")
let tokenInfo = colorFromHex("#60a5fa")

let canvasWidth = 1200
let canvasHeight = 630
let canvasSize = NSSize(width: canvasWidth, height: canvasHeight)
let canvasRect = CGRect(origin: .zero, size: canvasSize)
let cardRect = CGRect(x: 56, y: 72, width: 1088, height: 486)
let contentX = cardRect.minX + 64
let topInset: CGFloat = 88

let image = NSImage(size: canvasSize)

image.lockFocus()
guard let context = NSGraphicsContext.current?.cgContext else {
  fatalError("Failed to access graphics context.")
}

let colorSpace = CGColorSpaceCreateDeviceRGB()
let gradientColors: [CGColor] = [
  tokenBackground.cgColor,
  tokenBackgroundAlt.cgColor,
]
let gradientLocations: [CGFloat] = [0, 1]

if let gradient = CGGradient(
  colorsSpace: colorSpace,
  colors: gradientColors as CFArray,
  locations: gradientLocations
) {
  context.drawLinearGradient(
    gradient,
    start: CGPoint(x: 0, y: CGFloat(canvasHeight)),
    end: CGPoint(x: CGFloat(canvasWidth), y: 0),
    options: []
  )
}

context.setBlendMode(.screen)
context.setFillColor(colorFromHex("#f97316", alpha: 0.24).cgColor)
context.fillEllipse(in: CGRect(x: -160, y: 260, width: 700, height: 700))
context.setFillColor(colorFromHex("#60a5fa", alpha: 0.14).cgColor)
context.fillEllipse(in: CGRect(x: 780, y: -260, width: 620, height: 620))
context.setBlendMode(.normal)

context.setFillColor(colorFromHex("#404040", alpha: 0.9).cgColor)
context.fill(CGRect(x: contentX, y: cardRect.minY + 38, width: 460, height: 4))

let cardPath = CGPath(
  roundedRect: cardRect,
  cornerWidth: 28,
  cornerHeight: 28,
  transform: nil
)
context.setFillColor(colorFromHex("#121212", alpha: 0.46).cgColor)
context.addPath(cardPath)
context.fillPath()

context.setStrokeColor(colorFromHex("#404040", alpha: 0.95).cgColor)
context.setLineWidth(2)
context.addPath(cardPath)
context.strokePath()

let labelStyle = NSMutableParagraphStyle()
labelStyle.alignment = .left

func makeFont(_ name: String, size: CGFloat, weight: NSFont.Weight) -> NSFont {
  NSFont(name: name, size: size) ?? NSFont.systemFont(ofSize: size, weight: weight)
}

let kickerAttributes: [NSAttributedString.Key: Any] = [
  .font: makeFont("Avenir Next Medium", size: 26, weight: .medium),
  .foregroundColor: tokenTextMuted,
  .paragraphStyle: labelStyle,
  .kern: 1.2,
]
("PORTFOLIO / BLOG" as NSString).draw(
  in: CGRect(x: contentX, y: cardRect.maxY - topInset, width: 520, height: 40),
  withAttributes: kickerAttributes
)

let titleAttributes: [NSAttributedString.Key: Any] = [
  .font: makeFont("Avenir Next Demi Bold", size: 80, weight: .bold),
  .foregroundColor: tokenText,
  .paragraphStyle: labelStyle,
  .kern: 0.4,
]
("DUSAN TODOROVIC" as NSString).draw(
  in: CGRect(x: contentX, y: cardRect.minY + 232, width: 960, height: 130),
  withAttributes: titleAttributes
)

let subtitleAttributes: [NSAttributedString.Key: Any] = [
  .font: makeFont("Avenir Next Medium", size: 42, weight: .medium),
  .foregroundColor: tokenPrimaryLight,
  .paragraphStyle: labelStyle,
]
("Frontend Team Lead" as NSString).draw(
  in: CGRect(x: contentX, y: cardRect.minY + 162, width: 900, height: 70),
  withAttributes: subtitleAttributes
)

let urlAttributes: [NSAttributedString.Key: Any] = [
  .font: makeFont("Avenir Next Regular", size: 28, weight: .regular),
  .foregroundColor: tokenTextMuted,
  .paragraphStyle: labelStyle,
]
("todorovic.dev" as NSString).draw(
  in: CGRect(x: contentX, y: cardRect.minY + 70, width: 500, height: 40),
  withAttributes: urlAttributes
)

context.setStrokeColor(tokenPrimaryLight.cgColor)
context.setLineWidth(2.5)
context.stroke(
  CGRect(
    x: cardRect.maxX - 224,
    y: cardRect.minY + 64,
    width: 160,
    height: 160
  )
)

context.setFillColor(tokenPrimary.cgColor)
context.fillEllipse(
  in: CGRect(
    x: cardRect.maxX - 179,
    y: cardRect.minY + 109,
    width: 70,
    height: 70
  )
)

context.setStrokeColor(tokenInfo.cgColor)
context.setLineWidth(2)
context.strokeEllipse(
  in: CGRect(
    x: cardRect.maxX - 179,
    y: cardRect.minY + 109,
    width: 70,
    height: 70
  )
)

context.setStrokeColor(tokenPrimaryDark.cgColor)
context.setLineWidth(1.5)
context.stroke(
  CGRect(
    x: cardRect.minX + 12,
    y: cardRect.minY + 12,
    width: cardRect.width - 24,
    height: cardRect.height - 24
  )
)

image.unlockFocus()

guard
  let tiff = image.tiffRepresentation,
  let bitmap = NSBitmapImageRep(data: tiff),
  let pngData = bitmap.representation(using: .png, properties: [:])
else {
  fatalError("Failed to encode PNG output.")
}

let outputURL = URL(fileURLWithPath: outputPath)
do {
  try FileManager.default.createDirectory(
    at: outputURL.deletingLastPathComponent(),
    withIntermediateDirectories: true,
    attributes: nil
  )
  try pngData.write(to: outputURL)
  print("Generated \(outputURL.path)")
} catch {
  fatalError("Failed to write output image: \(error)")
}
