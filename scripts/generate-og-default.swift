import AppKit

let defaultOutputPath = FileManager.default.currentDirectoryPath + "/public/og-default.jpg"
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

func makeFont(_ name: String, size: CGFloat, weight: NSFont.Weight) -> NSFont {
  NSFont(name: name, size: size) ?? NSFont.systemFont(ofSize: size, weight: weight)
}

let canvasWidth = 1200
let canvasHeight = 630
let canvasSize = NSSize(width: canvasWidth, height: canvasHeight)
let cardRect = CGRect(x: 56, y: 72, width: 1088, height: 486)
let contentX = cardRect.minX + 64
let topInset: CGFloat = 88

guard let bitmapRep = NSBitmapImageRep(
  bitmapDataPlanes: nil,
  pixelsWide: canvasWidth,
  pixelsHigh: canvasHeight,
  bitsPerSample: 8,
  samplesPerPixel: 4,
  hasAlpha: true,
  isPlanar: false,
  colorSpaceName: .deviceRGB,
  bytesPerRow: 0,
  bitsPerPixel: 0
) else {
  fatalError("Failed to create bitmap representation.")
}
bitmapRep.size = canvasSize

guard let graphicsContext = NSGraphicsContext(bitmapImageRep: bitmapRep) else {
  fatalError("Failed to create graphics context.")
}
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = graphicsContext
let context = graphicsContext.cgContext

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
("DUŠAN TODOROVIĆ" as NSString).draw(
  in: CGRect(x: contentX, y: cardRect.minY + 232, width: 960, height: 130),
  withAttributes: titleAttributes
)

let subtitleAttributes: [NSAttributedString.Key: Any] = [
  .font: makeFont("Avenir Next Medium", size: 42, weight: .medium),
  .foregroundColor: tokenPrimaryLight,
  .paragraphStyle: labelStyle,
]
("Software Engineer & Team Lead" as NSString).draw(
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

NSGraphicsContext.restoreGraphicsState()

guard let jpegData = bitmapRep.representation(
  using: .jpeg,
  properties: [.compressionFactor: 0.82]
) else {
  fatalError("Failed to encode JPEG output.")
}

let outputURL = URL(fileURLWithPath: outputPath)
do {
  try FileManager.default.createDirectory(
    at: outputURL.deletingLastPathComponent(),
    withIntermediateDirectories: true,
    attributes: nil
  )
  try jpegData.write(to: outputURL)
  print("Generated \(outputURL.path)")
} catch {
  fatalError("Failed to write output image: \(error)")
}
