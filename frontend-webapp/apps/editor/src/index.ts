// Same async-boundary convention as the shell: load the real entry only
// after this chunk registers, so Module Federation's shared scope is ready.
import('./bootstrap');
