import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  // Brand & Surfaces
  static const Color primary = Color(0xFF00261B);
  static const Color primaryDark = Color(0xFF062A20);
  static const Color primaryContainer = Color(0xFF0B3D2E);
  static const Color onPrimary = Color(0xFFFFFFFF);
  static const Color onPrimaryContainer = Color(0xFF79A894);

  static const Color secondary = Color(0xFF146B45);
  static const Color secondaryDark = Color(0xFF156C46);
  static const Color secondaryContainer = Color(0xFFA3F4C3);
  static const Color onSecondaryContainer = Color(0xFF1E724B);

  static const Color warmEarth = Color(0xFFF7F4EC);
  static const Color surface = Color(0xFFEFFDF3);
  static const Color surfaceDim = Color(0xFFCFDDD4);
  static const Color surfaceBright = Color(0xFFEFFDF3);
  static const Color surfaceContainerLowest = Color(0xFFFFFFFF);
  static const Color surfaceContainerLow = Color(0xFFE9F7ED);
  static const Color surfaceContainer = Color(0xFFE3F1E7);
  static const Color surfaceContainerHigh = Color(0xFFDDECE2);
  static const Color surfaceContainerHighest = Color(0xFFD8E6DC);

  static const Color textMain = Color(0xFF17231D);
  static const Color onSurface = Color(0xFF121E18);
  static const Color textMuted = Color(0xFF66736C);
  static const Color onSurfaceVariant = Color(0xFF414944);

  static const Color borderClean = Color(0xFFDDE4DE);
  static const Color outline = Color(0xFF717974);
  static const Color outlineVariant = Color(0xFFC0C8C3);

  static const Color error = Color(0xFFBA1A1A);
  static const Color errorContainer = Color(0xFFFFDAD6);
  static const Color onErrorContainer = Color(0xFF93000A);
}

class AppTheme {
  static ThemeData get lightTheme {
    final baseTextTheme = GoogleFonts.interTextTheme();

    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: AppColors.surface,
      colorScheme: const ColorScheme(
        brightness: Brightness.light,
        primary: AppColors.primary,
        onPrimary: AppColors.onPrimary,
        primaryContainer: AppColors.primaryContainer,
        onPrimaryContainer: AppColors.onPrimaryContainer,
        secondary: AppColors.secondary,
        onSecondary: Colors.white,
        secondaryContainer: AppColors.secondaryContainer,
        onSecondaryContainer: AppColors.onSecondaryContainer,
        surface: AppColors.surface,
        onSurface: AppColors.onSurface,
        surfaceContainerLowest: AppColors.surfaceContainerLowest,
        surfaceContainerLow: AppColors.surfaceContainerLow,
        surfaceContainer: AppColors.surfaceContainer,
        surfaceContainerHigh: AppColors.surfaceContainerHigh,
        surfaceContainerHighest: AppColors.surfaceContainerHighest,
        onSurfaceVariant: AppColors.onSurfaceVariant,
        outline: AppColors.outline,
        outlineVariant: AppColors.outlineVariant,
        error: AppColors.error,
        onError: Colors.white,
        errorContainer: AppColors.errorContainer,
        onErrorContainer: AppColors.onErrorContainer,
      ),
      textTheme: baseTextTheme.copyWith(
        displayLarge: GoogleFonts.inter(
          fontSize: 32,
          fontWeight: FontWeight.w700,
          color: AppColors.textMain,
          letterSpacing: -0.5,
        ),
        headlineLarge: GoogleFonts.inter(
          fontSize: 28,
          fontWeight: FontWeight.w600,
          color: AppColors.textMain,
          letterSpacing: -0.4,
        ),
        headlineMedium: GoogleFonts.inter(
          fontSize: 22,
          fontWeight: FontWeight.w600,
          color: AppColors.textMain,
          letterSpacing: -0.2,
        ),
        headlineSmall: GoogleFonts.inter(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: AppColors.textMain,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: AppColors.textMain,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: AppColors.onSurfaceVariant,
        ),
        bodySmall: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w400,
          color: AppColors.textMuted,
        ),
        labelLarge: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: AppColors.textMain,
        ),
        labelMedium: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: AppColors.onSurfaceVariant,
        ),
        labelSmall: GoogleFonts.inter(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: AppColors.textMuted,
          letterSpacing: 0.4,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.surface.withValues(alpha: 0.9),
        elevation: 0,
        centerTitle: false,
        scrolledUnderElevation: 0,
        titleTextStyle: GoogleFonts.inter(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: AppColors.primary,
        ),
        iconTheme: const IconThemeData(color: AppColors.textMain),
      ),
      cardTheme: CardThemeData(
        color: AppColors.surfaceContainerLowest,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.borderClean, width: 0.5),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.onPrimary,
          elevation: 2,
          minimumSize: const Size.fromHeight(52),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.surfaceContainerLowest,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.borderClean, width: 1),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.secondary, width: 1.5),
        ),
        hintStyle: GoogleFonts.inter(
          color: AppColors.outline.withValues(alpha: 0.7),
          fontSize: 14,
        ),
      ),
    );
  }
}
