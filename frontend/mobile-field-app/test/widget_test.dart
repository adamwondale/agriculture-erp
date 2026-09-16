import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_field_app/main.dart';

void main() {
  testWidgets('App renders WelcomeSplashScreen smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const AgriFieldApp());

    // Verify that Welcome Back! or Sign In is present.
    expect(find.text('Sign In'), findsOneWidget);
    expect(find.text('Request for Partnership'), findsOneWidget);
  });
}
